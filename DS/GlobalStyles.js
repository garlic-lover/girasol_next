import { createGlobalStyle } from "styled-components";
import resetter from "./resetter";

const GlobalStyles = createGlobalStyle`
${resetter}
  @font-face {
  font-family: "Inconsolata";
  src: url("/Inconsolata.ttf") format('truetype');
  }
  @font-face {
    font-family: "Playfair";
    src: url("/PlayfairDisplay.ttf") format('truetype');
    }
    @font-face {
      font-family: "Montserrat";
      src: url("/Montserrat-Regular.ttf") format('truetype');
      }
  body {
    color : ${(props) => props.theme.color1};
    background-color : ${(props) => props.theme.background};
    font-size : 0.9em;
    font-family: "Montserrat";
  }
  h1 {
    font-family: "Playfair";
    font-size : 2rem;
  }
  h2 {
    font-family: "Playfair";
    font-size : 1.6rem;
    margin-bottom : 20px;
  }
  h3 {
    font-family: "Playfair";
    font-size : 1.4rem;
  }
  h4 {
    font-size : 1.2rem;
     color : ${(props) => props.theme.color2};
  }
  h5 {
      font-size : 1.1rem;
  }
  input, select, option{
    background-color : transparent ; 
    border-radius : 4px;
    border-width : 1px;
    padding : 8px 16px;
    border-style: solid;
    border-color : ${(props) => props.theme.color2};
    font-size : 11.25px;
    color : ${(props) => props.theme.color1};
  }
  input:focus{
    border-color : ${(props) => props.theme.color1};
  }
  a{
    text-decoration : none;
    color : ${(props) => props.theme.color1};
  }
  
 `;

export default GlobalStyles;
