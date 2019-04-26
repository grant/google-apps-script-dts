/**
 * Scraper
 */
export class Scraper {
  static categories: { [key: string]: any } = {};
  static services: { [key: string]: boolean } = {};
  static _queueued: { [key: string]: boolean } = {};
  static queue: string[] = []
  static queueTotal: number = 0

  static enqueue(url: string) {
    url = url.replace(/#.*/, '').replace(/\.html$/, '');
    if (url in this._queueued) return;
    this._queueued[url] = true;
    console.log(`ENQUEUE (${this.queueTotal}): ${url}`);
    this.queue.push(url);
    this.queueTotal = this.queue.length;
  }
};