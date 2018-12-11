import createAdvancedServiceDTs from './createAdvancedServiceDTs';
import genDevGoogleDT from './genDevGoogleDT';
import getDiscoveryDocs from './getDiscoveryDocs';
import setup from './setup';
import spiderDevGoogle from './spiderDevGoogle';

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
  await spiderDevGoogle();
  await genDevGoogleDT();
  await getDiscoveryDocs();
  await createAdvancedServiceDTs();
})();