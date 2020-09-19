export default function linkedPropsEvaluate(links) {
  let score = 0;
  let i = 0;
  while (i < links.length) {
    if (links[i].left.match === links[i].rightIndex) {
      score++;
    }
    i++;
  }
  return score;
}
