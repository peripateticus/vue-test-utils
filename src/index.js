/* eslint-env node, mocha, browser */

const browserify = require('browserify');
const vueify = require('vueify');
const { JSDOM } = require('jsdom');
const jQuery = require('jquery');

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
        const dom = new JSDOM(createDom(containerId, script), {
          runScripts: 'dangerously',
          // resources: "usable"
        });

        // Make $ available on window.
        dom.window.$ = jQuery(dom.window);

        // cb for any DOM interaction prior to assertions.
        if (typeof cb === 'function') {
          cb(dom.window);
        }

        resolve(dom.window);
      })
      .on('error', reject);
  });
}

module.exports = {
  test,
};
