/* eslint-env node, mocha, browser */

const path = require('path');
const browserify = require('browserify');
const vueify = require('vueify');
const { JSDOM } = require('jsdom');
const R = require('ramda');

/**
 * Creates the DOM container for Vue components. This
 * will be instantiated within jsdom.
 * 
 * @param {String} containerId DOM Id of the container component will be placed in.
 * @param {String} script The compiled script returned from browserify. 
 */
function createDom(script) {
  return `<body>
            <div id='parent-container'}></div>
            <script>${script}</script>
          </body>
        `;
}

/**
     * Trigger function to trigger an event (currently only a MouseEvent) on
     * a DOM element.
     * @param win Window object.
     * @param type The event type, e.g. 'click'
     * @param el The element to trigger the event on.
     * @param mouseEventInit Optional. Additional event properties. See
     * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent.
     */
const trigger = function (win, type, el, mouseEventInit = {}) {
  const event = new win.MouseEvent(type, Object.assign({
    view: win,
    bubbles: true,
    cancelable: true,
  }, mouseEventInit));

  // Dispatch the event on element.
  if (el && event) {
    el.dispatchEvent(event);
  } else {
    throw new Error(`Unable to dispatch ${type} event on ${el.tagName}`);
  }
};

/**
 * Test function that is called from within a mocha
 * test.
 * 
 * @param {String} pathToHarness The path to Vue harness where component is instantiated.
 * @param {String} containerId DOM ID of the container component will be placed in.
 */
const testCurried = R.curry((dirName, parentPath, dataPath, eventTriggerFn = () => {}) => new Promise((resolve, reject) => {
  let script = '';

  const s = new require('stream').Readable();
  const pathToParent = path.resolve(dirName, parentPath);
  const pathToData = path.resolve(dirName, dataPath);

  // console.log(pathToParent, pathToData);

  const vueMain = `const Vue = require('vue');

// Parent component.
const component = require('${pathToParent}');

// Turn off tips.
Vue.config.productionTip = false;

// Instantiate component with data.
new Vue({
  el: '#parent-container',
  render(createElement) {
    return createElement(component, {
      props: {
        item: require('${pathToData}'),
      },
    });
  },
});
`;

  s.push(vueMain);
  s.push(null);

  // browserify(pathToHarness)
  browserify(s)
    .transform(vueify)
    .bundle()
    .on('data', (chunk) => {
      script += chunk;
    })
    .on('end', () => {
      const dom = new JSDOM(createDom(script), {
        runScripts: 'dangerously',
        // resources: "usable"
      });

        // Add event triggering utility to window.
      dom.window.trigger = trigger.bind(null, dom.window);

      // cb for any DOM interaction prior to assertions.
      if (typeof eventTriggerFn === 'function') {
        eventTriggerFn(dom.window);
      }

      resolve(dom.window);
    })
    .on('error', reject);
}));

module.exports = {
  test: testCurried,
};
