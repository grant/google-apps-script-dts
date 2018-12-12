const chalk = require('chalk');

import createAdvancedServiceDTs from './createAdvancedServiceDTs';
import genDevGoogleDT from './genDevGoogleDT';
import getDiscoveryDocs from './getDiscoveryDocs';
import setup from './setup';
import spiderDevGoogle from './spiderDevGoogle';
import test from './test';

// Plan
// 1. Make dir
// 1. Spider developers.google.com
// 1. Create spider.json
// 1. Convert spider.json to DefinitelyTyped/types/google-apps-script/*.d.ts
// 1. Use Google Discovery API for whitelisted APIs
// 1. Create DefinitelyTyped/types/google-apps-script/apis/[service_name]_[version].d.ts

// Wrap in async function
(async () => {
  await setup();
  console.log(chalk.green('# DONE – setup'));
  await spiderDevGoogle();
  console.log(chalk.green('# DONE – Spider developers.google.com/apps-script/reference'));
  await genDevGoogleDT();
  // console.log(chalk.green('# DONE – Generate DT for *non-advanced* services'));
  // await getDiscoveryDocs();
  // console.log(chalk.green('# DONE – Crawl Google Discovery Doc'));
  // await createAdvancedServiceDTs();
  // console.log(chalk.green('# DONE – Generate DT for *advanced* services'));

  // temp needed for compile to work
  test();
})();
