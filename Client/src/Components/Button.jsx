// import styled from "styled-components";

// const StyledButton = styled.button`
//   background-image: url(${(props) => props.icon});
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: contain;
//   background-color: transparent;
//   width: 50px;
//   margin: 10px;
//   padding: 10px;
//   color: black;
//   &:hover {
//     transform: scale(1.4);
//   }
//   //If there is React Component icon like RectIcons or StyledIcons change size and display flex
//   ${(props) =>
//     typeof props.icon === "string"
//       ? null
//       : "display : flex; align-items : center; justify-content: center; font-size: 40px;"}
// `;

// export const Button = (props) => {
//   return (
//     <StyledButton
//       className={props.className}
//       icon={props.icon}
//       onClick={(e) => {
//         props.handler(e);
//       }}
//     >
//       {props.children}
//     </StyledButton>
//   );
// };
import styled from "styled-components";

const StyledButton = styled.button`
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: transparent;
  border: 0;
  outline: 0;
  width: 50px;
  margin: 10px;
  padding: 10px;
  color: black;
  font-size: 20px;
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
      : "display : flex; align-items : center; justify-content: center; font-size: 40px;"}
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
      {console.log(children)}
      {children}
    </StyledButton>
  );
};
