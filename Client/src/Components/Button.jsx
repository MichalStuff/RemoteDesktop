import styled from "styled-components";

const StyledButton = styled.button`
  background-image: url(${(props) => props.icon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: transparent;
  width: 70px;
  // heigh: 70px;
  margin: 10px;
  padding: 10px;
  color: black;
`;

export const Button = (props) => {
  return (
    <StyledButton
      className={props.className}
      icon={props.icon}
      onClick={(e) => {
        props.handler(e);
      }}
    >
      {props.children}
    </StyledButton>
  );
};
