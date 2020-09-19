import { useContext } from "react";
import { store } from "../store";
import { useQuery } from "@apollo/client";
import TAGS_GET from "../GraphQl/Queries/TAGS_GET";

export default function useTags(learnedLanguage) {
  const { dispatch } = useContext(store);
  useQuery(TAGS_GET, {
    variables: { lang: learnedLanguage },
    onCompleted: (ev) => {
      dispatch({ type: "tagsLoad", tags: ev.tagsGet });
    },
  });
}
