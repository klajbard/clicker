export const roundToDecimal = (num: number, decimal = 1) =>
  Math.round((num + Number.EPSILON) * Math.pow(10, decimal)) /
  Math.pow(10, decimal);

const POSTFIXES = ["", " K", " M", " B", " T", " Qa", " Qi", " Sx", " Sp"];

export const toHumanReadable = (
  num: number,
  notation: "suffix" | "scientific" = "suffix"
): string => {
  if (num === 0 || num === undefined || num === null) return "0";
  if (num < 0) return `-${toHumanReadable(-num, notation)}`;

  if (notation === "scientific" && num >= 10000) {
    const exp = Math.floor(Math.log10(num));
    const mantissa = num / Math.pow(10, exp);
    return `${mantissa.toFixed(2)}e${exp}`;
  }

  if (num < 10000) {
    return `${addCommaDelimiter(Math.floor(num * 10) / 10)}`;
  }

  const precidedNum = parseFloat(num.toPrecision(4));
  const exponent = Math.floor(Math.floor(Math.log10(precidedNum) - 1) / 3);
  const postfix =
    POSTFIXES[exponent < 0 ? 0 : Math.min(exponent, POSTFIXES.length - 1)];

  if (exponent >= POSTFIXES.length) {
    const exp = Math.floor(Math.log10(num));
    const mantissa = num / Math.pow(10, exp);
    return `${mantissa.toFixed(2)}e${exp}`;
  }

  const result = parseFloat(
    (precidedNum / Math.pow(10, 3 * exponent)).toPrecision(4)
  );

  return `${addCommaDelimiter(result)}${postfix}`;
};

export const addCommaDelimiter = (num: number) => num.toLocaleString("en-US");

export const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s}s`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
};
