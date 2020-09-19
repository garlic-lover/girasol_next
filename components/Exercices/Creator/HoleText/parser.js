export default function parser(string) {
  string = string.replace(/\n/g, "jump_to_the_line ");

  let parsed = string.split(" ");
  let newTab = [];
  let newLine = [];
  let i = 0;
  let reg = /[.,?!;:()]/;
  let jumpReg = /jump_to_the_line/;

  while (i < parsed.length) {
    let theWord = parsed[i];
    let isJump = jumpReg.test(theWord);
    if (isJump === true) {
      theWord = theWord.replace("jump_to_the_line", "");
    }
    let isPonct = reg.exec(theWord);
    if (isPonct) {
      let splitted = theWord.replace(isPonct[0], "");
      newLine.push(splitted);
      newLine.push(isPonct[0]);
    } else {
      newLine.push(theWord);
    }
    if (isJump === true) {
      newTab.push(newLine);
      newLine = [];
    }
    i++;
  }
  newTab.push(newLine);
  return newTab;
}
