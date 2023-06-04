import styled from "styled-components";

const StyledButton = styled.button`
  background-color: white;
  margin: 10px;
  padding: 10px;
  color: black;
`;

export const Button = (props) => {
  return (
    <StyledButton
      onClick={(e) => {
        props.handler(e);
      }}
    >
      {props.children}
    </StyledButton>
  );
};
