function makeLotto() {
  return Array(7)
    .fill()
    .map(() => Math.floor(Math.random() * 45 + 1))
    .sort(function (a, b) {
      return a - b;
    });
}

const lotto = makeLotto();
console.log(lotto);
