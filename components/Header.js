import { useState, useEffect, useContext } from "react";
import { store } from "../store";
import styled from "styled-components";
import Link from "next/link";

import ConnectedStatus from "./SigninLogin/ConnectedStatus";

export default function MB({ themes, displaySigninChange }) {
  const [isScrolled, isScrolledChange] = useState(false);
  const {
    state: { t, connectedStatus },
    dispatch,
  } = useContext(store);

  useEffect(() => {
    window.addEventListener("scroll", (ev) => {
      if (window.scrollY > 0 && isScrolled === false) {
        isScrolledChange(true);
      }
      if (window.scrollY === 0 && isScrolled === true) {
        isScrolledChange(false);
      }
    });
  }, []);

  return (
    <Header scrolled={true}>
      <div>
        <Link href="/">
          <Title>Idiomas</Title>
        </Link>
        <SubTitle>{t("header", "tagline")}</SubTitle>
      </div>
      <ConnectedStatus themes={themes} />
      <Menu>
        <Item>
          <ul>
            <li>
              Ressources
              <ul>
                <li>
                  <a>
                    <Link href="/res_studio">Créer</Link>
                  </a>
                </li>
                <li>
                  <Link href="/my_exercices">
                    <a>Gérer</a>
                  </Link>
                </li>
                <li>
                  <a>Explorer</a>
                </li>
              </ul>
            </li>
          </ul>
        </Item>
        <Item>
          <ul>
            <li>
              Exercices
              <ul>
                <li>
                  <Link href="/ex_studio">
                    <a>Créer</a>
                  </Link>
                </li>
                <li>
                  <Link href="/my_exercices">
                    <a>Gérer</a>
                  </Link>
                </li>
                <li>
                  <Link href="/exercices">
                    <a>Explorer</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </Item>
        <Item>
          {connectedStatus ? (
            <li
              onClick={() => {
                localStorage.removeItem("token");
                dispatch({
                  type: "connect",
                  connectedStatus: false,
                  myLanguage: state.myLanguage,
                  learnedLanguage: "",
                });
              }}
            >
              Déconnexion
            </li>
          ) : (
            <li
              onClick={() => {
                displaySigninChange(true);
              }}
            >
              Connexion
            </li>
          )}
        </Item>
      </Menu>
    </Header>
  );
}

const Header = styled.header`
  height: 90px;
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ease-in 0.3s;
  background-color: ${(props) => props.theme.background};
  box-shadow: ${(props) =>
    props.scrolled && "0 8px 16px hsla(30, 21%, 81%, 0.15)"};
  & div:first-child {
    margin-left: 30px;
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.color1};
  cursor: pointer;
`;

const SubTitle = styled.h4`
  color: ${(props) => props.theme.color1};
  font-family: "Playfair";
  font-size: 30px;
`;

const Menu = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  position: absolute;
  right: 30px;
  top: 30px;
`;

const Item = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
  width: 180px;
  font-size: 0.9rem;
  z-index: 99;
  flex: 1;
  & ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  & li {
    transition: ease-in 0.5s;
    margin-bottom: 12px;
    cursor: default;
    padding: 10px;
    border-radius: 2px;
  }
  & li ul {
  }
  & li li {
    max-height: 0;
    overflow: hidden;
    transition: ease-in 0.5s;
    border-radius: 0;
    box-shadow: none;
    border: none;
    margin: 0;
    cursor: pointer;
    color: grey;
  }
  & li li:first-child {
    padding-top: 15px;
  }
  & a {
    display: block;
    text-decoration: none;
    color: grey;
    padding: 8px 0;
  }
  & ul li a {
    transition: ease-in 0.5s;
    color: transparent;
  }
  & li:hover li a {
    color: grey;
  }
  & li:hover li a:hover {
    color: black;
    text-decoration: underline;
  }
  & li:hover {
    background-color: ${(props) => props.theme.color5};
    box-shadow: 0 8px 16px hsla(30, 21%, 81%, 0.15);
  }
  & li li:hover {
    box-shadow: inherit;
  }
  & li:hover li {
    max-height: 15em;
  }
  &:last-child li {
    cursor: pointer;
  }
`;
