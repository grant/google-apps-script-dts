const util = require('util');
const mkdirp = require('mkdirp');
const mkdirpPromise = util.promisify(mkdirp);

export default async function setup() {
  // Make directory ./DefinitelyTyped/types/google-apps-script/
  await mkdirpPromise('DefinitelyTyped/types/google-apps-script/');
  console.log('Created folder: DefinitelyTyped/types/google-apps-script/');
  await mkdirpPromise('DefinitelyTyped/types/google-apps-script/apis');
  console.log('Created folder: DefinitelyTyped/types/google-apps-script/apis/');
}