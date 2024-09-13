export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function makeProperAmNumber(string: string) {
  let re =
    /^([+-]{1}?(?:([0-9]{0,7}))|([0-9]{1})?(?:([0-9]{0,7})))?(?:\.([0-9]{0,4}))?$/;
  return re.test(string);
}

export function makeProperPointNumber(string: string) {
  let re =
    /^([+-]{1}?(?:([0-9]{0,3}))|([0-9]{1})?(?:([0-9]{0,3})))?(?:\.([0-9]{0,2}))?$/;
  return re.test(string);
}

export function checkFinalTestForAmBet(string: string) {
  let re = /^[+-]?([0-9]{1,7})?(?:\.[0-9]{1,2}?)?$/;
  return re.test(string);
}
export function checkFinalTestForBetPoint(string: string) {
  let re = /^[+-]?([0-9]{1,7})?(?:\.[0-9]{1,2}?)?$/;
  return re.test(string);
}

export function convertAmToDecOdds(number: number) {
  if (number >= 100) {
    const num = 1 + number / 100;
    return num.toFixed(2);
  } else {
    const num = 1 - 100 / number;
    return num.toFixed(2);
  }
}

export function convertDecOddsToAmOdds(number: number) {
  if (number >= 2.0) {
    const num = 100 * (number - 1);
    return num.toFixed(2);
  } else {
    const num = 100 / (1 - number);
    return num.toFixed(2);
  }
}

export const validateOddsNumber = (value: string) => {
  //true for digits only.
  const minNagetieValue = -100;
  const minPositiveValue = 100;
  const maxNagetieValue = -9999999.9999;
  const maxPositiveValue = 9999999.9999;
  const numVal = Number(value); //convert string to number
  const isValid =
    (numVal >= minPositiveValue && numVal <= maxPositiveValue) ||
    (numVal <= minNagetieValue && numVal >= maxNagetieValue);
  return isValid;
};
export const validatePointNumber = (value: string) => {
  //true for digits only.
  const minNagetieValue = -2.0;
  const minPositiveValue = 2.0;
  const maxNagetieValue = -100;
  const maxPositiveValue = 300;
  const numVal = Number(value); //convert string to number
  const isValid =
    (numVal >= minPositiveValue && numVal <= maxPositiveValue) ||
    (numVal <= minNagetieValue && numVal >= maxNagetieValue);
  return isValid;
};
