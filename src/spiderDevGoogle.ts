import { categoryFromUrl, printHeader } from './utils';

import { Scraper } from './scraper';
import { load } from 'cheerio';

const co = require('co');
const rp = require('request-promise');
const chalk = require('chalk');
const URL = require('url');

const CONCURRENCY = 1;
const MIN_WAIT = 1_000;

/**
 * Scrapes a specific URL.
 * @param {string} url The URL of the Apps Script reference doc.
 */
export async function visit(url: string) {
  const category = categoryFromUrl(url);
  if (!category) return;
  if (!Scraper.categories[category]) {
    Scraper.categories[category] = {
      decls: {}
    };
  }
  let result = await rp({ url });
  
  // Message to the user
  const queueRatio = `[${Scraper.queue.length + 1}/${Scraper.queueTotal}]`;
  const bytes = result.length;
  console.log(`${queueRatio} VISIT(${category}) (${bytes} bytes): ${url}`);
  return result;
}

/**
 * Scrapes the HTML from the page.
 * @param html The Apps Script reference doc html.
 * @param url The Apps Script reference doc page.
 * @return {Promise<object>} A promise with an ast of the page.
 */
export async function scrape(html: string, url: string) {
  const category = categoryFromUrl(url);
  var $: CheerioStatic;
  try { // There may be issues parsing cheerio
    $ = load(html);
  } catch(e) {
    console.error(`Error loading in cheerio: ${url}`);
    console.error(e);
    console.error('HTML:');
    console.error(html);
    return;
  }
  let headingText = $('h1').text();
  let m = headingText.match(/(Class|Enum|Interface) ([a-zA-Z0-9_.]+)/);
  if (!m) {
    let m = headingText.match(/^\s*(.+) Service/);
    if (m) {
      Scraper.categories[category].name = m[1];
    } else {
      console.error('!!! unexpected heading: ' + headingText);
    }
    return;
  }

  // doc
  const doc = $('.type.doc').children().filter((i, el) => {
    return $(el).css('display') !== 'none';
  }).map((i, el) => {
    if ($(el).is('pre')) {
      // indent code part
      return '\n' + $(el).text().split(/\n/).map((line) => '    ' + line).join('\n') + '\n\n';
    } else {
      return $(el).text();
    }
  }).toArray().join('\n');

  const decl: {
    kind: string,
    name: string,
    doc: string,
    url: string,
    properties: any[],
    methods: any[],
  } = {
    kind: m[1].toLowerCase(),
    name: m[2],
    doc: doc,
    url: url,
    properties: [],
    methods: []
  };

  function resolveHref(link: any) {
    let href = link.attr('href');
    if (href) {
      return URL.resolve(url, href);
    }
  }

  /// props
  $('table.members.property tr:not(:first-child)').each((i, el) => {
    let cells = $(el).find('td');
    if (cells.length !== 3) return;
    let name = cells.eq(0),
      type = cells.eq(1),
      doc = cells.eq(2);

    let typeHref = resolveHref(type.find('a'));
    if (typeHref) Scraper.enqueue(typeHref);

    decl.properties.push({
      name: name.text(),
      type: { name: type.text(), category: categoryFromUrl(typeHref) },
      doc: doc.text()
    });
  });

  /// methods
  $('table.members.function tr:not(:first-child)').each((i, el) => {
    let cells = $(el).find('td');
    if (cells.length !== 3) return;

    let name = cells.eq(0),
      type = cells.eq(1),
      doc = cells.eq(2);

    let typeHref = resolveHref(type.find('a'));
    if (typeHref) Scraper.enqueue(typeHref);

    let method: {
      name: any,
      returnType: any,
      doc: any,
      params: any,
    } = {
      name: name.text().replace(/\(.*$/, ''),
      returnType: { name: type.text(), category: categoryFromUrl(typeHref) },
      doc: doc.text(),
      params: []
    };

    let detailId = name.find('a').attr('href').substring(1);
    // $('#' + detailId) fails
    $('*[id]').filter(function () {
      return $(el).attr('id') === detailId;
    })
      .find('table.function.param tr:not(:first-child)').each(function () {
        let cells = $(el).find('td');
        if (cells.length !== 3) return;
        let name = cells.eq(0),
          type = cells.eq(1),
          doc = cells.eq(2);
        let typeHref = resolveHref(type.find('a'));
        if (typeHref) Scraper.enqueue(typeHref);
        method.params.push({
          name: name.text(),
          type: { name: type.text(), category: categoryFromUrl(typeHref) },
          doc: doc.text()
        });
      })
    decl.methods.push(method);
  });
  Scraper.categories[category].decls[decl.name] = decl;
}

// Main method
export default async function spiderDevGoogle() {
  console.log(chalk.yellow('TODO: spider developers.google.com/apps-script/reference.'));
  const startURL = 'https://developers.google.com/apps-script/reference/';
  const result = await rp(startURL);
  const $ = load(result);

  let inServices = true;
  $('.devsite-section-nav li li li').each((i, el) => {
    const name = $(el).text();
    if (name === 'Classes') {
      inServices = false;
      return;
    }
    let url = $(el).find('a[href]').attr('href');
    if (!url) return;
    url = URL.resolve(startURL, url);
    if (inServices) {
      Scraper.services[url] = true;
    }
    Scraper.enqueue(url);
    if (name === 'Overview') {
      inServices = true;
    }
  });
  printHeader('DONE SPIDER');
  printHeader('START SCRAPE');
  while (Scraper.queue.length > 0) {
    let url = Scraper.queue.splice(0, CONCURRENCY)[0];
    let html = await visit(url);
    let ast = await scrape(html, url);
  }
}