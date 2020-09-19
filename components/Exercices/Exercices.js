import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import ExCreator from "./Creator/ExCreator";
import MyExercices from "./MyEx/MyExercices";

export default function Ex({ match: { url } }) {
  return (
    <Exercices>
      <Route path={`${url}/create`} component={ExCreator} />
      <Route path={`${url}/my_exercices`} component={MyExercices} />
    </Exercices>
  );
}

const Exercices = styled.div``;
