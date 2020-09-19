import React, { useState, useContext } from "react";
import { store } from "../store";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

export default function ({ isProf, courses }) {
  const {
    state: { t },
  } = useContext(store);

  let params = useLocation();
  const [openedMenu, open] = useState(0);

  const pages = [
    { name: t("menu", "vocab"), path: "vocabulary" },
    { name: t("menu", "conjug"), path: "conjugation" },
    { name: t("menu", "self"), path: "self" },
    {
      main: t("menu", "ex"),
      sub: [
        { name: t("menu", "ex_creator"), path: "create" },
        { name: t("menu", "my"), path: "my_exercices" },
      ],
    },
    { name: t("menu", "res"), path: "resources" },
    { name: t("menu", "stud"), path: "students" },
    { name: t("menu", "settings"), path: "settings" },
  ];

  let toMap = pages;
  if (!isProf) {
    toMap.splice(3, 3);
    courses.map((course) => {
      toMap.push({
        name: `${course.name}`,
        path: `course/${course._id}`,
      });
      return null;
    });
  }
  return (
    <Menu>
      {toMap.map((page, index) => {
        if (page.name) {
          return (
            <Item
              key={index}
              selected={`/${page.path}` === params.pathname}
              onClick={() => {
                open(index);
              }}
            >
              <Link to={`/${page.path}`}>{page.name}</Link>
            </Item>
          );
        } else {
          return (
            <Item key={index} hasChildren>
              <ItemMain
                onClick={() => {
                  open(index);
                }}
              >
                {page.main}
              </ItemMain>
              <ItemSubs opened={openedMenu === index}>
                {page.sub.map((subPage, theIndex) => {
                  return (
                    <SubItem
                      key={`${index}-${theIndex}`}
                      selected={
                        `/${page.main.toLowerCase()}/${subPage.path.toLowerCase()}` ===
                        params.pathname
                      }
                    >
                      <Link
                        to={`/${page.main.toLowerCase()}/${subPage.path.toLowerCase()}`}
                      >
                        {subPage.name}
                      </Link>
                    </SubItem>
                  );
                })}
              </ItemSubs>
            </Item>
          );
        }
      })}
    </Menu>
  );
}

const Menu = styled.ul`
  position: fixed;
  left: 20px;
  top: 160px;
  width: 160px;
`;

const Item = styled.li`
  line-height: 30px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  transition: 0.3s ease-in-out;
  font-size: ${(props) => (props.selected ? "1.2em" : "0.9em")};
  /* border-bottom: ${(props) =>
    props.selected ? `solid 1px ${props.theme.color2}` : ""}; */
  background-color: #fffdf0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  & a {
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
  }
  &:hover {
    font-size: ${(props) => !props.hasChildren && "1.2em"};
  }
  & a:hover {
    opacity: 1;
  }
`;

const ItemMain = styled.div`
  cursor: pointer;
  margin-bottom: 10px;
  opacity: 0.5;
`;

const ItemSubs = styled.div`
  /*  height: ${(props) =>
    props.opened
      ? "auto"
      : "0"};
  -webkit-transition: opacity 1s ease-in;
  -moz-transition: opacity 1s ease-in;
  -o-transition: opacity 1s ease-in;
  transition: opacity 1s ease-in;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  opacity: ${(
    props
  ) => (props.opened ? "auto" : "0")};
  overflow: hidden; */
`;

const SubItem = styled.p`
  transition: 0.3s ease-in-out;
  font-size: 0.9em;
  margin-left: 12px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  /* border-bottom: ${(props) =>
    props.selected ? `solid 1px ${props.theme.color2}` : "#fffdf0"}; */
  font-size: ${(props) => (props.selected ? "1.1em" : "0.9em")};
  &:last-child {
    margin-bottom: 0px;
  }
  & a {
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
  }
  &:hover {
    font-size: 1.1em;
  }
`;
