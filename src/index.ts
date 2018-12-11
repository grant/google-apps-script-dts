const util = require('util');
const mkdirp = require('mkdirp');
const mkdirpPromise = util.promisify(mkdirp);

// Make directory
// ./DefinitelyTyped/types/google-apps-script/
mkdirp('DefinitelyTyped/types/google-apps-script/', () => {
  console.log('hi');
});
console.log('done');
