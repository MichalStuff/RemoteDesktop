import styled from "styled-components";
import { SocketContext } from "../Context/SocketContext";
import { useContext } from "react";

import { Button } from "./Button";
import { useEffect } from "react";
import { useState } from "react";

import DesktopLogo from "../assets/desktop.svg";
import { FaPlayCircle } from "react-icons/fa";
import { FaStopCircle } from "react-icons/fa";

const StyledMenu = styled.nav`
  position: absolute;
  margin: 0 auto;
  top: 5px;
  left 50%;
  transform : translateX(-50%);
  display: flex;
  align-items : space-between;
  jutify-content : center;
  height: 8vh;
  min-width: 200px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.6px);
  -webkit-backdrop-filter: blur(7.6px);
  height: 30px;
  transition : 1s;
  & >button{
    width:0;
    overflow: hidden;
    display : none; 
  }
  &:hover{
    height: 8vh;
    & button{
      width:50px;
      display : flex; 
    }
  }

`;

const Menu = ({ streamStatus, handleStream }) => {
  const [displays, setDisplays] = useState([]);

  // useEffect(() => {
  //   console.log(displays);
  //   console.log(typeof AiOutlinePlayCircle);
  // }, [displays]);

  useEffect(() => {
    let intervalId;
    if (streamStatus !== false) {
      intervalId = setInterval(() => {
        console.log("Streaming");
        takeScreenShot();
      }, 100);
    }
    return () => {
      console.log("Stop");
      clearInterval(intervalId);
    };
  }, [streamStatus]);

  const ShowDisplays = () => {
    return displays.map((display, index) => {
      return (
        <Button
          key={index}
          icon={DesktopLogo}
          handler={() => {
            socket.emit("ChangeDisplay", index);
          }}
        >
          {index + 1}
        </Button>
      );
    });
  };

  const takeScreenShot = () => {
    socket.emit("takeScreenShot", "streamStartred");
  };
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("DispalyData", ([...data]) => {
      setDisplays(data);
    });
    return () => {
      socket.off("DispalyData");
    };
  }, []);

  return (
    <StyledMenu>
      <Button handler={handleStream}>
        {streamStatus ? <FaStopCircle /> : <FaPlayCircle />}
      </Button>
      {ShowDisplays()}
    </StyledMenu>
  );
};

export default Menu;
