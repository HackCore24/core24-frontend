// 1, 2, 6
export function declOfNum(number: number, titles: [string, string, string]) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

export function reduceNum(number: number) {
  if (number >= 1000000000) {
    return `${(number / 1000000000).toFixed(1)} млрд.`;
  }
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)} млн.`;
  }
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)} тыс.`;
  }
  return number;
}
