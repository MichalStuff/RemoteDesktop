import { useContext, useEffect } from "react";
import { SocketContext } from "../Context/SocketContext";
import styled from "styled-components";

import Image from "./Image";
import defaultImage from "../assets/desktop_big.svg";
import { useState } from "react";

const StyledScreen = styled.main`
  max-height: 100vh;
`;

const Screen = ({ streamStatus }) => {
  const [image, setImage] = useState(defaultImage);

  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on("refresh", (data) => {
      setImage(`data:image/jpg;base64, ${data}`);
    });
    return () => {
      socket.off("refresh");
      setImage(defaultImage);
    };
  }, []);

  useEffect(() => {
    console.log(streamStatus);
    if (streamStatus === false) {
      setTimeout(() => {
        setImage(defaultImage);
      }, [200]);
    }
  }, [streamStatus]);

  const handleMouse = (e) => {
    if (streamStatus) {
      console.log(
        `X : ${e.clientX - e.target.offsetLeft} Y : ${
          e.clientY - e.target.offsetTop + 1
        }`
      );
      console.log(
        `Width : ${e.target.clientWidth} Height : ${e.target.clientHeight}`
      );
      const MouseData = {
        X: e.clientX - e.target.offsetLeft,
        Y: e.clientY - e.target.offsetTop + 1,
        Width: e.target.clientWidth,
        Height: e.target.clientHeight,
      };
      socket.emit("MouseClick", MouseData);
    }
  };
  const handleKeyboard = (e) => {
    const letters = /^[A-Za-z0-9]$/gm;
    if (letters) {
      socket.emit("letter", e.key);
    }
    console.log(e.key);
    e.keyCode === 50 ? null : e.preventDefault();
    // if (streamStatus) {
    //   socket.emit("KeyDown", e.key);
    // }
  };

  return (
    <StyledScreen
      tabIndex={0}
      onClick={(e) => {
        handleMouse(e);
      }}
      onKeyDown={(e) => {
        handleKeyboard(e);
      }}
    >
      <Image src={image} alt={"Destop Screen"} />
    </StyledScreen>
  );
};

export default Screen;
