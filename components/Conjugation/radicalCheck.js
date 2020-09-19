export default function (radical, type) {
  type = type.split("-")[1];

  radical = radical.split("");
  radical = radical.splice(radical.length - 2);
  radical = radical.join("");

  let isGood = false;
  if (radical === type) {
    isGood = true;
  }
  return isGood;
}
