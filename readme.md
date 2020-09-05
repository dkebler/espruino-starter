# Espruino Starter

### build and deploy V2+ espruino compatible code with extended (es6+) features using esm modules


*this is super early commit, just getting it out there to see if others can build/upload successfully*

**the package.json scripts in the repo are set to upload to an esp32 wroom board on my linux dev machine, you'll have to change the npm scripts accordingly**


Uses rollup to

* bundle esm based modules main.js, app.js, those in `/lib` plus `node_modules` dependencies.
* extend the [current features](https://www.espruino.com/Features) via buble and one babel plugin.  Extended features include async/await, rest/spread, let/const block scope, destructring assignment and more with minimal bloat.
* allow an options file in yaml format to be imported containing application configuration settings/options
* Allow environment variables set on dev machine to effect the environment of the build.  See injectProcessEnv plugin and rollup.config.js.

clone this repo

copy `example.options.yaml` to `options.yaml` and edit accordingly

* `npm install`  install all the build dependencies
* `npm run build`  makes espruino builds in /build directory
* `npm dev`  builds and uploads then runs terminal on device
* `npm run pro`  builds and uploads and saves to flash
* `npm run wipe`  will reset and clear flash on esp and also wifi settings

repo includes local copy of eslint and eslintrc.js file.  Can thus lint via atom plugin (or I assume vscode plugin but I don't use vscode)

job.json is not currently used but will be in future commits.
