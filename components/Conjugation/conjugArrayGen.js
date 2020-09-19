import regulares from "./regulares.json";

const personas = ["Yo", "Tu", "Ella/El", "Nosotros", "Ustedes/Ellos/Ellas"];

export default function (verbType, form, radical) {
  let tab = [];
  let verb = regulares[verbType][form];

  let tiempos = Object.keys(verb);
  personas.map((persona) => {
    let personaRow = { persona: persona };
    tiempos.map((tiempo) => {
      return (personaRow[tiempo] =
        radical + regulares[verbType][form][tiempo][persona]);
    });
    return tab.push(personaRow);
  });
  return tab;
}
