import Router from "./shared/Router";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/config/configStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <>
      <Provider store={store}>
        {/* PersistGate를 사용해 상태 복원 */}
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle />
          <Router />
        </PersistGate>
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
