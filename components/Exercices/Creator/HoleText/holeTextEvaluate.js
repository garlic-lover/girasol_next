export default function holeTextEvaluate(words) {
  let score = 0;
  let i = 0;
  while (i < words.length) {
    if (words[i].word.toLowerCase() === words[i].response.toLowerCase()) {
      score = score + 1;
    }
    i++;
  }

  return score;
}
