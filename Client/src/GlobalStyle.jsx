import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin : 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Arimo', sans-serif;
    }
    *::-webkit-scrollbar {
        display : none;
      }
      ::-webkit-scrollbar-thumb {
        background: #888; 
      }
    body{
        overflow : hidden;
    }
`;
