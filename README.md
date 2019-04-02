# google-apps-script-dts

Generates TypeScript definitions for [`@types/google-apps-script`](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/google-apps-script).

## Generate Basic Types

See https://github.com/motemen/dts-google-apps-script for generating basic types.

## Generate Advanced Types

Follow the instructions on this page:

1. Download Advanced Types data

- Use the data in the `data_in` folder.
  - This data was gathered from observing the network data from the Apps Script IDE when enabling an Advanced Service.
  - You can add updated JSON there.

2. Process the data scraper

```sh
generate1.sh
```

3. Generate `d.ts` files

```sh
# Build the advanced types processor
cd dts-google-apps-script-advanced/
tsc index.ts
cd ..

# Run the generator
mkdir -p DefinitelyTyped/types/google-apps-script/apis
```

```sh
generate2.sh

# adsence_v1_4
# analytics_v3
# analyticsreporting_v4
# appsactivity_v1
# bigquery_v2
# calendar_v3
# classroom_v1
# content_v2
# dfareporting_v3_3
# directory_v1
# docs_v1
# drive_v2
# driveactivity_v2
# fusiontables_v2
# gmail_v1
# groupsmigration_v1
# groupssettings_v1
# licensing_v1
# mirror_v1
# peopleapi_v1
# reports_v1
# reseller_v1
# sheets_v4
# slides_v1
# tagmanager_v2
# tasks_v1
# urlshortener_v1
# youtube_v3
# youtubeanalytics_v2
# youtubepartner_v1
```

## Create a PR to DefinitelyTyped

1. Fork https://github.com/DefinitelyTyped/DefinitelyTyped
1. Run the following script, but rename `grant` to your GitHub username.

```sh
# Clone repos in a new directory.
git clone git@github.com:grant/google-apps-script-dts.git
git clone git@github.com:DefinitelyTyped/DefinitelyTyped.git

# Delete old types
rm -rf DefinitelyTyped/types/google-apps-script/

# Generate types
cd google-apps-script-dts;
npm run build;
npm run gen;
cd ..;
cp google-apps-script-dts/types/google-apps-script/ DefinitelyTyped/types/google-apps-script/
cd DefinitelyTyped;

# View Changes
git diff

# Update GitHub
git add -A
git commit -m '[types/google-apps-script] Generate Types ($(date +%Y-%m-%d)'
git push
```

Then open on GitHub and create a PR to DefinitelyTyped.

## GitHub Template

Fill out the GitHub PR with the following details:

Title: `[types/google-apps-script] Generate Types`

Body:
```
- [x] Use a meaningful title for the pull request. Include the name of the package modified.
- [x] Test the change in your own code. (Compile and run.)
- [x] Add or edit tests to reflect the change. (Run with `npm test`.)
- [x] Follow the advice from the [readme](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.md#make-a-pull-request).
- [x] Avoid [common mistakes](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.md#common-mistakes).
- [x] Run `npm run lint package-name` (or `tsc` if no `tslint.json` is present).

Select one of these and delete the others:

If changing an existing definition:
- [x] Provide a URL to documentation or source code which provides context for the suggested changes: https://developers.google.com/apps-script/reference/
- [x] Increase the version number in the header if appropriate.
- [x] If you are making substantial changes, consider adding a `tslint.json` containing `{ "extends": "dtslint/dt.json" }`.
```

## Previous Work

Also see:
https://github.com/motemen/dts-google-apps-script