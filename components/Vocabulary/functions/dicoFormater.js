export default function dicoFormater(lang, tradLang, words, selectedLetter) {
  let tab = [];

  for (let i = 0; i < words.length; i++) {
    if (words[i].trads[tradLang]) {
      if (selectedLetter) {
        if (words[i].firstLetter === selectedLetter) {
          tab.push({
            [lang]:
              words[i].type === "Noun"
                ? `${words[i].value.toLowerCase()} (${words[i].gender})`
                : words[i].value.toLowerCase(),
            [tradLang]: words[i].trads[tradLang].join(", ").toLowerCase(),
            type: words[i].type,
          });
        }
      } else {
        tab.push({
          [lang]:
            words[i].type === "Noun"
              ? `${words[i].value.toLowerCase()} (${words[i].gender})`
              : words[i].value.toLowerCase(),
          [tradLang]: words[i].trads[tradLang].join(", ").toLowerCase(),
          type: words[i].type,
        });
      }
    }
  }
  return tab;
}
