import { useContext, useEffect } from "react";
import { SocketContext } from "../Context/SocketContext";
import styled from "styled-components";

import Image from "./Image";
import { useState } from "react";

const StyledScreen = styled.main`
  width: 95vw;
  height: 90vh;
  background-color: red;
`;

const Screen = () => {
  const [image, setImage] = useState(`data:image/jpg;base64,`);

  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on("refresh", (data) => {
      setImage(`data:image/jpg;base64, ${data}`);
    });
    return () => {
      socket.off("refresh");
    };
  }, []);

  return (
    <StyledScreen
      onClick={(e) => {
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
      }}
    >
      <Image src={image} alt={"Destop Screen"} />
    </StyledScreen>
  );
};

export default Screen;
