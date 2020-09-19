import regulares from "../../../Conjugation/regulares.json";

const persons = ["Yo", "Tu", "Ella/El", "Nosotros", "Ustedes/Ellos/Ellas"];

export default function (verbs) {
  let trainingTab = [];

  // Create probabilities of indic'/subj' according to their weights
  let family = Object.keys(regulares["-ar"]);
  let totalWeight = 0;
  let j = 0;
  let tiemposProbas = [];
  while (j < family.length) {
    let weight = Object.keys(regulares["-ar"][family[j]]).length;
    tiemposProbas.push(weight);
    totalWeight = totalWeight + weight;
    j++;
  }

  let i = 0;
  while (i < 20) {
    // Pick a verb randomly
    let random = Math.trunc(Math.random() * verbs.length);
    let verb = verbs[random];

    // Get its radical and its type
    let radical = verb
      .split("")
      .splice(0, verb.length - 2)
      .join("");

    let type = `-${verb
      .split("")
      .splice(verb.length - 2)
      .join("")}`;

    // Pick a random person
    let randomPerson = persons[Math.trunc(Math.random() * persons.length)];

    // Pick a random verb form
    let randomVerbIndex = Math.trunc(Math.random() * totalWeight);
    let verbFamily = null;
    let verbForm = null;
    let k = 0;
    let tiemposProp = 0;
    while (verbFamily === null) {
      if (tiemposProp + tiemposProbas[k] > randomVerbIndex) {
        verbFamily = family[k];
        let verbForms = Object.keys(regulares["-ar"][family[k]]);
        verbForm = verbForms[randomVerbIndex - tiemposProp];
      } else {
        tiemposProp = tiemposProp + tiemposProbas[k];
        k++;
      }
    }

    // Finally, get the solution
    let solution = regulares[type][verbFamily][verbForm][randomPerson];

    trainingTab.push({
      verb: verb,
      radical: radical,
      type: type,
      person: randomPerson,
      verbFamily: verbFamily,
      verbForm: verbForm,
      solution: solution,
    });
    i++;
  }

  return trainingTab;
}
