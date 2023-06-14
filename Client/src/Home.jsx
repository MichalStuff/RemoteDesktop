import { useState } from "react";
import Menu from "./Components/Menu";
import Screen from "./Components/Screen";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Home = () => {
  const [streamStatus, setStreamStatus] = useState(false); // Status of stream [bool]
  // change stream status
  const handleStream = () => {
    setStreamStatus((prev) => !prev); // change stream status
  };
  return (
    <StyledContainer>
      <Menu streamStatus={streamStatus} handleStream={handleStream} />
      <Screen streamStatus={streamStatus} />
    </StyledContainer>
  );
};
