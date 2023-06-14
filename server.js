PORT = process.env.VITE_PORT || 8080

const express = require('express');
var cors = require('cors');
const app = express();
const path = require('path');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const http = require(`http`);
const robot = require('robotjs');
const server = http.Server(app);
const io = require('socket.io')(server,{
  cors: {
    origin: '*',
  }
});

app.use(cors({
  origin : '*'
})); 

let Image //Placeholder for an Image
let CURRENT_DISPALY = 0; // Information what display it's used currently
let Displays = null; // Array of displays
let MAIN_SCREEN = null; // Main screen (default screen)

//Connection with socket, Communication with client
io.on('connection',(socket)=>{
  console.log("New User Connected");
  // Get list of displays and sort
  screenshot.listDisplays().then(displays =>{
    displays.sort((a,b)=>{
      if ( a.id < b.id ){
        return -1;
      }
      if ( a.id > b.id ){
        return 1;
      }
      return 0;
    })
    Displays= displays;
    MAIN_SCREEN = Displays.findIndex( disp => disp.left === 0); // assignment of a MAIN_SCREEN (where left = 0)
    CURRENT_DISPALY = MAIN_SCREEN; // assignment CUREENT_DISPLAY default as MAIN_SCREEN
    // console.log("MAIN SCREEN : ", MAIN_SCREEN);
    socket.emit("DispalyData", displays); // emits list of displays to client
  });
  //After client change display list sets CURRENT_DISPALY to choosen by client
  socket.on("ChangeDisplay",(data)=>{
    CURRENT_DISPALY = data;
  });
  //React to click event from client
  socket.on("MouseClick",(data)=>{
    // console.log(data);
    const ratio = {X :  Displays[CURRENT_DISPALY].width /data.Width , Y : Displays[CURRENT_DISPALY].height / data.Height}; // Calctulate Ratio of client screen and real screan
    if(Displays[CURRENT_DISPALY].left < 0){
      robot.moveMouse(data.X * ratio.X - Displays[CURRENT_DISPALY].width, data.Y * ratio.Y + Displays[CURRENT_DISPALY].top); // Move mouse to cliecked position
      // console.log(data.X * ratio.X - Displays[CURRENT_DISPALY].width, data.Y * ratio.Y + Displays[CURRENT_DISPALY].top);
    }else{
      if(Displays[MAIN_SCREEN].width == Displays[CURRENT_DISPALY].left){
        robot.moveMouse(Displays[MAIN_SCREEN].width + data.X * ratio.X, data.Y * ratio.Y + Displays[CURRENT_DISPALY].top); // Move mouse to cliecked position
      }else{
        robot.moveMouse(data.X * ratio.X, data.Y * ratio.Y + Displays[CURRENT_DISPALY].top); // Move mouse to cliecked position
      }

    } 
          robot.mouseClick("left"); // after moving mouse to the position left click on object 
  }); 
  //  Trigger Special Key ( Tab, Enter, Ctrl, Alt)
  socket.on("KeyDown",(data)=>{
    robot.keyTap(data); // Write that key
  });
  // Triger Letters and Number (a-z, 0-9)
  socket.on("letter",(data)=>{
    robot.typeString(data); //Write that letter
  });
  // After client Start loop take screenshot 
  socket.on("takeScreenShot",(data)=>{
    screenshot({format : 'jpg', screen : Displays[CURRENT_DISPALY].id || null }).then((img)=>{
      // fs.writeFileSync('screemshoot.jpg',img); //save imge as jpg  Test purpouses
      Image = img.toString('base64'); // Write img to base64
      socket.emit("refresh", Image); // send Image to the client
    }).catch((error)=>{
      console.log(error);
    })
  });
  //Message after user disonnect
  socket.on('disconnect',()=>{
    console.log('user disconnected');
  })
})
// Server start listening
server.listen(PORT,()=>{
  console.log(`Listening on port : ${PORT}`);
})