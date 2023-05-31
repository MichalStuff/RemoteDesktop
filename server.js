PORT = process.env.PORT || 8080

const express = require('express');
var cors = require('cors');
const app = express();
const path = require('path');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const http = require(`http`);
const server = http.Server(app);
const io = require('socket.io')(server,{
  cors: {
    origin: '*',
  }
});

app.use(cors({
  origin : '*'
}));

screenshot.listDisplays().then(displays =>{
  // console.log(displays)
});

let Image

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

app.get('/api',(req,res)=>{
  res.json({Image: Image})
});

io.on('connection',(socket)=>{
  console.log("New User Connected");
  socket.on("takeScreenShot",(data)=>{
    screenshot({format : 'jpg'}).then((img)=>{
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