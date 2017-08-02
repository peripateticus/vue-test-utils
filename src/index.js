/* eslint-env node, mocha, browser */

const browserify = require('browserify');
const vueify = require('vueify');
const jsdom = require('jsdom-global');

/**
 * Creates the DOM container for Vue components. This
 * will be instantiated within jsdom.
 * 
 * @param {String} containerId DOM Id of the container component will be placed in.
 * @param {String} script The compiled script returned from browserify. 
 */
function createDom(containerId, script) {
  return `<body>
            <div id=${containerId}></div>
            <script>${script}</script>
          </body>
        `;
}

/**
 * Test function that is called from within a mocha
 * test.
 * 
 * @param {String} pathToHarness The path to Vue harness where component is instantiated.
 * @param {String} containerId DOM ID of the container component will be placed in.
 */
function test(pathToHarness, containerId, cb) {
  return new Promise((resolve, reject) => {
    let script = '';
    browserify(pathToHarness)
      .transform(vueify)
      .bundle()
      .on('data', (chunk) => {
        script += chunk;
      })
      .on('end', () => {
        const cleanup = jsdom(createDom(containerId, script), {
          runScripts: 'dangerously',
          // resources: "usable"
        });

        const $ = require('jquery');
        window.$ = $;
        window.cleanup = cleanup;

        // cb for any DOM interaction prior to assertions.
        if (typeof cb === 'function') {
          cb(window);
        }

        resolve(window);
      })
      .on('error', reject);
  });
}

module.exports = {
  test,
};
