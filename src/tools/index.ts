const md5 = require('md5');
const ripple = require('@erichsia7/ripple');

export function generateIdentifier(prefix: string = ''): string {
  const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let result = `${prefix}_`;
  const length: number = 16;
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.round(Math.random() * characterSet.length);
    result += characterSet.substring(randomNumber, randomNumber + 1);
  }
  return result;
}

export function hash(content: any): string {
  return md5(content);
}

export function addRippleTo(element: HTMLElement, color?: string = 'var(--d-cssvar-000408)', duration?: number = 450, callback?: Function): void {
  ripple.__addToSingleElement(element, color, duration, callback);
}
