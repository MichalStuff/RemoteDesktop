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
  return (
    <StyledContainer>
      <Menu />
      <Screen />
    </StyledContainer>
  );
};
