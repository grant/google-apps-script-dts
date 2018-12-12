import {visit} from './spiderDevGoogle';

// This export is just needed for typescript to compile
export default async function test() {
  console.log('Use npm run test');
}

const testURL = 'https://developers.google.com/apps-script/reference/spreadsheet/protection-type';
const html = visit(testURL);