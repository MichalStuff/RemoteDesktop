import styled from "styled-components";
import { SocketContext } from "../Context/SocketContext";
import { useContext } from "react";

import { Button } from "./Button";
import { useEffect } from "react";
import { useState } from "react";

import DesktopLogo from "../assets/desktop.svg";

const StyledMenu = styled.nav`
  position: absolute;
  margin: 0 auto;
  top: 0;
  left 50%;
  transform : translateX(-50%);
  display: flex;
  width: 90%;
  height: 8vh;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.6px);
  -webkit-backdrop-filter: blur(7.6px);
`;

const Menu = () => {
  // let intervalId;

  const [displays, setDisplays] = useState([]);
  const [streamStatus, setStreamStatus] = useState(false);

  useEffect(() => {
    console.log(displays);
  }, [displays]);

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

  const handleStream = () => {
    setStreamStatus((prev) => !prev);
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
        {streamStatus ? "Stop Stream" : "Start Stream"}
      </Button>
      {ShowDisplays()}
    </StyledMenu>
  );
};

export default Menu;
