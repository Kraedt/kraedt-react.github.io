import * as math from 'mathjs';
import * as datefns from 'date-fns';

const baseApiUri = 'https://54.167.152.119/';
//const baseApiUri = 'https://localhost:5001/';

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

export const objQueryString = (params: any) => {
  return !!params
    ? '?' + Object.keys(params).map(k => k + '=' + params[k]).join('&')
    : '';
}

export const apiUri = (uri: string, params?: any) => {
  var qs = typeof params === 'object' ? objQueryString(params) : `/${params}`;
  return baseApiUri + uri + (params ? qs : '');
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

export const isNullOrWhitespace = (str?: string) => {
  return str === undefined || str === null || str.trimStart().trimEnd() === "";
}

export const goToTop = () => {
  window.scrollTo(0, 0);
}

export const generateGuid = () => {
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    // eslint-disable-next-line no-mixed-operators
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export const getClientId = () => {
  var clientId = sessionStorage.getItem("clientId") ?? '';

  if (isNullOrWhitespace(clientId)) {
    clientId = generateGuid();
    sessionStorage.setItem("clientId", clientId);
  }

  return clientId;
}