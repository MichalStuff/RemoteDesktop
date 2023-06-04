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

let Image
let CURRENT_DISPALY = 0;
let Displays = null;
let MAIN_SCREEN = null;

console.log(screenshot);

screenshot({format : 'jpg'}).then((img)=>{
  // console.log(img);
  fs.writeFileSync('screemshoot.jpg',img);
  Image = img.toString('base64')
}).catch((error)=>{
  console.error(error);
})

//Function on testing purposes 

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection',(socket)=>{
  console.log("New User Connected");
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
    MAIN_SCREEN = Displays.findIndex( disp => disp.left === 0);
    CURRENT_DISPALY = MAIN_SCREEN;
    console.log("MAIN SCREEN : ", MAIN_SCREEN);
    socket.emit("DispalyData", displays);
  });

  socket.on("ChangeDisplay",(data)=>{
    CURRENT_DISPALY = data;
  });

  socket.on("MouseClick",(data)=>{
    console.log(data);
    const ratio = {X :  Displays[CURRENT_DISPALY].width /data.Width , Y : Displays[CURRENT_DISPALY].height / data.Height}
    if(Displays[CURRENT_DISPALY].left < 0){
      robot.moveMouse(data.X * ratio.X - Displays[CURRENT_DISPALY].width, data.Y * ratio.Y + Displays[CURRENT_DISPALY].top);
      console.log(data.X * ratio.X - Displays[CURRENT_DISPALY].width, data.Y * ratio.Y + Displays[CURRENT_DISPALY].top);
    }else{
      if(Displays[MAIN_SCREEN].width == Displays[CURRENT_DISPALY].left){
        robot.moveMouse(Displays[MAIN_SCREEN].width + data.X * ratio.X, data.Y * ratio.Y + Displays[CURRENT_DISPALY].top);
      }else{
        robot.moveMouse(data.X * ratio.X, data.Y * ratio.Y + Displays[CURRENT_DISPALY].top);
      }

    } 
          robot.mouseClick("left"); 
          console.log(Displays);
          console.log(ratio); 
  }); 

  socket.on("takeScreenShot",(data)=>{
    screenshot({format : 'jpg', screen : Displays[CURRENT_DISPALY].id || null }).then((img)=>{
      fs.writeFileSync('screemshoot.jpg',img);
      Image = img.toString('base64')
      socket.emit("refresh", Image);
    }).catch((error)=>{
    })
  });

  socket.on('disconnect',()=>{
    console.log('user disconnected');
  })
})

server.listen(PORT,()=>{
  console.log(`Listening on port : ${PORT}`);
})