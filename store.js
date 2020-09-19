import { createContext, useReducer } from "react";

import FR from "./Translation/fr.json";
import EN from "./Translation/en.json";
import ES from "./Translation/es.json";

const translations = {
  en: EN,
  fr: FR,
  es: ES,
};

const getTranslate = (myLanguage) => (comp, key) => {
  if (key) {
    return translations[myLanguage][comp][key] || key;
  } else {
    return translations[myLanguage][comp];
  }
};

const initialState = {
  connectedStatus: "loading",
  firstName: "",
  lastName: "",
  myLanguage: "fr",
  learnedLanguage: null,
  tags: [],
  isProf: null,
  courses: [],
  students: [],
  t: getTranslate("fr"),
  themeIndex: 0,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    let newState;
    switch (action.type) {
      case "connect":
        newState = {
          ...state,
          connectedStatus: action.connectedStatus,
          myLanguage: action.myLanguage,
          t: getTranslate(action.myLanguage),
          learnedLanguage: action.learnedLanguage,
          firstName: action.firstName,
          lastName: action.lastName,
          isProf: action.isProf,
          courses: action.courses,
          students: action.students,
        };
        return newState;
      case "langChange":
        return {
          ...state,
          myLanguage: action.lang,
          t: getTranslate(action.lang),
        };
      case "themeChange":
        return {
          ...state,
          themeIndex: action.themeIndex,
        };
      case "tagsLoad":
        newState = { ...state, tags: action.tags };
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
