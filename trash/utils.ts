const chalk = require('chalk');

/**
 * Gets the category of URL from the url.
 * @param url The Apps Script reference URL
 */
export function categoryFromUrl(url: string): string {
  var m = /^https:\/\/developers\.google\.com\/apps-script\/reference\/([^/]+)/.exec(url);
  if (!m) return '';
  return m[1];
}

/**
 * Prints a header.
 * @param {string} message The message to print.
 */
export const printHeader = (message: string) => {
  console.log(chalk.green(`## ${message} ##`));
}
