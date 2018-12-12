// Scraper
export class Scraper {
  static categories: { [key: string]: any } = {};
  static services: { [key: string]: boolean } = {};
  static _queueued: { [key: string]: boolean } = {};
  static queue: string[] = []

  static enqueue(url: string) {
    url = url.replace(/#.*/, '').replace(/\.html$/, '');
    if (url in this._queueued) return;
    this._queueued[url] = true;
    console.log(`ENQUEUE: ${url}`);
    this.queue.push(url);
  }
};