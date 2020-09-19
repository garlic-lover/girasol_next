import { useState, useEffect } from "react";
import styled from "styled-components";

import LinkedPropsCreator from "./LinkedPropsCreator";
import LinkedPropsEx from "./LinkedPropsEx";

import randomizeWords from "./randomizeWords";

export default function LP({ mode, title, description }) {
  const [words, wordsChange] = useState([
    { proposition: "Proposition 1", solution: "Solution1" },
    { proposition: "Proposition 2", solution: "Solution2" },
    { proposition: "Proposition 3", solution: "Solution3" },
    { proposition: "Proposition 4", solution: "Solution4" },
  ]);
  const [theWords, theWordsChange] = useState({ leftTab: [], rightTab: [] });
  const [links, linksChange] = useState([]);

  useEffect(() => {
    theWordsChange(randomizeWords(words));
  }, [words]);

  return (
    <LinkedProps>
      {mode === "create" ? (
        <LinkedPropsCreator
          words={words}
          wordsChange={wordsChange}
          title={title}
          description={description}
        />
      ) : (
        <LinkedPropsEx
          theWords={theWords}
          links={links}
          linksChange={linksChange}
        />
      )}
    </LinkedProps>
  );
}

const LinkedProps = styled.div``;
