import * as math from 'mathjs';
import * as datefns from 'date-fns';

const baseUri = 'https://localhost:5001/api/';

export const intlNumberFormat = (value: number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(value);
export const intlAmountFormat = (value: number) => {
  const formatted = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(value)
  return value < 0
    ? `-$${formatted.split('-')[1]}`
    : `$${formatted}`;
}

export const dateToId = (date: Date) => datefns.format(date, 'MM-yyyy');

export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max)
}

export const queryString = (params: any) => {
  return '?' + Object.keys(params).map(k => k + '=' + params[k]).join('&');
}

export const apiUri = (uri: string, params?: any) => {
  return baseUri + uri + (params ? queryString(params) : '');
}

export const evaluateMath = (eq: string) => {
  let value = undefined;
  try {
    value = math.evaluate(eq);
  } catch (error) {
    return Number(value);
  }

  return Number(value);
}

export const convertToFloat = (value: number, decimals: number) => {
  return Number(value.toFixed(decimals));
}