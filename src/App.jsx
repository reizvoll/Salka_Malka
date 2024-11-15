import "./App.css";
import Router from "./shared/Router";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
  box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f0f0;
    
  }
  //버튼 css초기화했어요.
  button {
    all: unset;
  }
 
`;

export default App;
