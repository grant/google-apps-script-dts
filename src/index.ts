const util = require('util');
const mkdirp = require('mkdirp');
const mkdirpPromise = util.promisify(mkdirp);

// Plan
// 1. Make dir
// 1. Spider developers.google.com
// 1. Create spider.json
// 1. Convert spider.json to DefinitelyTyped/types/google-apps-script/*.d.ts
// 1. Use Google Discovery API for whitelisted APIs
// 1. Create DefinitelyTyped/types/google-apps-script/apis/[service_name]_[version].d.ts

// Wrap in async function
(async () => {
  console.log('hi');
})();

// // Make directory
// // ./DefinitelyTyped/types/google-apps-script/
// mkdirp('DefinitelyTyped/types/google-apps-script/', () => {
//   console.log('hi');
// });
// console.log('done');