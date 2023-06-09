import { useContext, useEffect } from "react";
import { SocketContext } from "../Context/SocketContext";
import styled from "styled-components";

import Image from "./Image";
import defaultImage from "../assets/desktop_big.svg";
import { useState } from "react";

const StyledScreen = styled.main`
  max-height: 100vh;
`;
// Render Image
const Screen = ({ streamStatus }) => {
  const [image, setImage] = useState(defaultImage); //Imagge state

  const { socket } = useContext(SocketContext); // Socket instance configured inside context
  // After response from server set new image
  useEffect(() => {
    socket.on("refresh", (data) => {
      setImage(`data:image/jpg;base64, ${data}`); // set new image
    });
    return () => {
      socket.off("refresh");
      setImage(defaultImage); // set image to default unmounting
    };
  }, []);

  useEffect(() => {
    if (streamStatus === false) {
      setTimeout(() => {
        setImage(defaultImage); //set image to default afte delay
      }, [200]); // delay 200ms
    }
  }, [streamStatus]); // depending on steam status
  // send position of mouse on client side display
  const handleMouse = (e) => {
    if (streamStatus) {
      // console.log(
      //   `X : ${e.clientX - e.target.offsetLeft} Y : ${
      //     e.clientY - e.target.offsetTop + 1
      //   }`
      // );
      // console.log(
      //   `Width : ${e.target.clientWidth} Height : ${e.target.clientHeight}`
      // );
      const MouseData = {
        X: e.clientX - e.target.offsetLeft,
        Y: e.clientY - e.target.offsetTop + 1,
        Width: e.target.clientWidth,
        Height: e.target.clientHeight,
      }; // Send Client Data about mouse
      socket.emit("MouseClick", MouseData);
    }
  };
  // send keyCode to the server
  const handleKeyboard = (e) => {
    e.keyCode === 50 ? null : e.preventDefault();
    if (streamStatus) {
      const letters = /^[A-Za-z0-9]$/gm;
      if (letters.test(e.key)) {
        let str = e.key;
        socket.emit("letter", str.toLowerCase());
        console.log("Letter : ", str);
      } else {
        let str = e.key;
        socket.emit("KeyDown", str.toLowerCase());
        console.log("Sign : ", str.toLowerCase());
      }
    }
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
