import styled from "styled-components";

const StyledButton = styled.button`
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: transparent;
  border: 0;
  outline: 0;
  max-width: 50px;
  width: 50px;
  margin: 10px 30px;
  padding: 10px;
  color: black;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:focus {
    border: 0;
    outline: 0;
  }
  &:hover {
    transform: scale(1.4);
  }
  //If there is React Component icon like RectIcons or StyledIcons change size and display flex
  ${({ icon }) =>
    typeof icon === "string"
      ? null
      : "font-size: 40px; padding : 0; margin : 10px 10px 10px 20px"}
`;

export const Button = ({ className, icon, handler, children }) => {
  return (
    <StyledButton
      className={className}
      icon={icon}
      onClick={(e) => {
        handler(e);
      }}
    >
      {children}
    </StyledButton>
  );
};
