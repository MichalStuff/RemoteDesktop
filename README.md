# RemoteDesktop 


### Intoduction

__RemoteDesktop__  is app that allows to controll your desktop computer inside your local network (for this moment only from PC or Laptop). I made this app to use by myself and from pue curiosity.
![screen](https://github.com/MichalStuff/RemoteDesktop/assets/87261327/c7869df5-c35e-4e3f-b385-13b58e9838f0)

 
### Table of Contents
* [Introduction](#introduction)
* [Techologies](#techologies)
* [Setup](#setup)

### Technologies

* JavaScript
* React.js (v 18.2.0)
* Node.js
* Express.js (v 4.18.2)
* SocketIO/ SocketIO-client (v 4.6.2)
* Styled Componens (v 5.3.11)
* Robot.js (v 0.6.0) [link](http://robotjs.io/)
* Sreenshot-desktop [link](https://github.com/bencevans/screenshot-desktop)

### Setup
* To use this this project you need to download this repository [link](https://github.com/MichalStuff/RemoteDesktop)
* Then create 2 ".env" files one in main folder and one inside "Client" folder in both add :
    ```JSON
        VITE_PORT = "YOUR PORT"
        VITE_IP  = "YOUR IP"
    ```
* Then go to the main folder and type in cmd ``` npm run dev ```
* Next step is to go the likn that you will recive from cmd
* You can remotely controll your pc inside local network 
