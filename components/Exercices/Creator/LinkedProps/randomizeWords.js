export default function randomizeWords(words) {
  let leftTab = [];
  let rightTab = [];
  let i = 0;
  while (i < words.length) {
    let toPushLeft = { value: words[i].proposition, position: "", try: "" };
    while (toPushLeft.position === "") {
      let randomNum = Math.trunc(Math.random() * words.length);
      let leftIndex = leftTab.findIndex((val) => val.position === randomNum);
      if (leftIndex === -1) {
        toPushLeft.position = randomNum;
      }
    }
    let toPushRight = { value: words[i].solution, position: "", try: "" };
    while (toPushRight.position === "") {
      let randomNum = Math.trunc(Math.random() * words.length);
      let rightIndex = rightTab.findIndex((val) => val.position === randomNum);
      if (rightIndex === -1) {
        toPushRight.position = randomNum;
      }
    }
    toPushLeft.match = toPushRight.position;
    toPushRight.match = toPushLeft.position;
    leftTab.push(toPushLeft);
    rightTab.push(toPushRight);
    i++;
  }
  leftTab = leftTab.sort(function (a, b) {
    return a.position - b.position;
  });
  rightTab = rightTab.sort(function (a, b) {
    return a.position - b.position;
  });

  return { leftTab, rightTab };
}
