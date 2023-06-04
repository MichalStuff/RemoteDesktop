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
    socket.emit("DispalyData", displays);
  });

  socket.on("ChangeDisplay",(data)=>{
    CURRENT_DISPALY = data;
  });

  socket.on("MouseClick",(data)=>{
    console.log(data);
    // const ratio = {X :  robot.getScreenSize().width /data.Width , Y : robot.getScreenSize().height / data.Height}
    const ratio = {X :  Displays[CURRENT_DISPALY].width /data.Width , Y : Displays[CURRENT_DISPALY].height / data.Height}
    robot.moveMouse(data.X * ratio.X, data.Y * ratio.Y)
    // robot.moveMouse(-1920,1063);
    robot.mouseClick("left");
    console.log(Displays);
    // console.log(Displays[CURRENT_DISPALY]);
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