import { useState, useContext } from "react";
import { store } from "../store";
import styled, { ThemeProvider } from "styled-components";

import Header from "../components/Header";
import SigninLogin from "../components/SigninLogin/SigninLogin";

import GlobalStyles from "../DS/GlobalStyles";
import theme from "../DS/theme.json";
import theme2 from "../DS/themeBis.json";
import theme3 from "../DS/themeTer.json";

const themes = [theme, theme2, theme3];

export default function Layout({ children }) {
  const [displaySignin, displaySigninChange] = useState(false);

  const {
    state: { connectedStatus, isProf, courses, themeIndex },
  } = useContext(store);

  return (
    <ThemeProvider theme={themes[themeIndex]}>
      <GlobalStyles />
      <App>
        <Header themes={themes} displaySigninChange={displaySigninChange} />
        {displaySignin && (
          <SigninLogin displaySigninChange={displaySigninChange} />
        )}
        <Main>{children}</Main>
      </App>
    </ThemeProvider>
  );
}

const App = styled.div`
  positon: relative;
  width: 100%;
  height: 100%;
`;

const Main = styled.div`
  position: relative;
  top: 120px;
  width: calc(100% - 60px);
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  z-index: 98;
`;
