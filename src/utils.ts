/**
 * Gets the category of URL from the url.
 * @param url The Apps Script reference URL
 */
export function categoryFromUrl(url: string) {
  var m = /^https:\/\/developers\.google\.com\/apps-script\/reference\/([^/]+)/.exec(url);
  if (!m) return null;
  return m[1];
}
