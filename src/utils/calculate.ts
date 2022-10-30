export const roundToDecimal = (num: number, decimal = 1) =>
  Math.round((num + Number.EPSILON) * Math.pow(10, decimal)) /
  Math.pow(10, decimal);

const POSTFIXES = ["", " k", " M", " G", " T", " p", " E"];

export const toHumanReadable = (num: number) => {
  if (!num || num <= 10000) {
    return `${addCommaDelimiter(num)}`;
  }
  const precidedNum = parseFloat(num.toPrecision(4));
  const exponent = Math.floor(Math.floor(Math.log10(precidedNum) - 1) / 3);
  const postfix = POSTFIXES[exponent < 0 ? 0 : exponent];
  const result = parseFloat(
    (precidedNum / Math.pow(10, 3 * exponent)).toPrecision(4)
  );

  return `${addCommaDelimiter(result)}${postfix}`;
};

export const addCommaDelimiter = (num: number) => num.toLocaleString("en-US");
