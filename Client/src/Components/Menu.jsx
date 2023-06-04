import styled from "styled-components";
import { SocketContext } from "../Context/SocketContext";
import { useContext } from "react";

import { Button } from "./Button";
import { useEffect } from "react";
import { useState } from "react";

const StyledMenu = styled.nav`
  display: flex;
  width: 90%;
  height: 8vh;
  background-color: red;
  margin: 30px;
  border-radius: 10px;
`;

const Menu = () => {
  let intervalId;

  const [displays, setDisplays] = useState([]);

  useEffect(() => {}, [displays]);

  const ShowDisplays = () => {
    return displays.map((display, index) => {
      return (
        <Button
          key={index}
          handler={() => {
            socket.emit("ChangeDisplay", display.id);
          }}
        >
          Display {index + 1}
        </Button>
      );
    });
  };

  const startStream = () => {
    //Stream loop
    intervalId = setInterval(() => {
      takeScreenShot();
    }, 100);
  };

  const stopStream = () => {
    console.log("Stop");
    clearInterval(intervalId);
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
      <Button handler={startStream}>Start Stream</Button>
      <Button handler={stopStream}>Stop Stream</Button>
      {ShowDisplays()}
    </StyledMenu>
  );
};

export default Menu;
