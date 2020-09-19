export default function (exWord, response) {
  let status = false;

  response = response.toLowerCase();

  let solution = (
    exWord.radical + exWord.solution.replace(`-`, ``)
  ).toLowerCase();

  console.log(response, solution);
  if (response === solution) {
    status = true;
  }

  return status;
}
