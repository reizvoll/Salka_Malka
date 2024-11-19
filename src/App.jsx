import "./App.css";
import Router from "./shared/Router";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <Router />
      </Provider>
      <ToastContainer
        autoClose={3000} // 자동 off 시간
      />
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
  a {
    all : unset;
  }
 
`;

export default App;
