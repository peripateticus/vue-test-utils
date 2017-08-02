/* eslint-disable prefer-arrow-callback */
/* eslint-env node, mocha, browser */

const assert = require('assert');
const test = require('../src/index').test;
const item = require('./harness/component-data');
const path = require('path');

describe('Vue test utils', () => {
  const pathToHarness = path.resolve(__dirname, './harness/vue-main');

  it('should render components with children', function () {
    return test(pathToHarness, 'parent').then((win) => {
      assert.equal(document.querySelector('#div1').textContent, 'div1');
      window.x = 1;
      win.cleanup();
    });
  });

  it('should render components with data', function () {
    return test(pathToHarness, 'parent').then((win) => {
      assert.equal(document.querySelector('#div2').textContent, item.x);
      window.x = 1;
      win.cleanup();
    });
  });

  it('clean up jsdom environment', function () {
    return test(pathToHarness, 'parent').then((win) => {
      assert.ok(!win.x);
      win.cleanup();
    });
  });

  it('update dom per Vue dom event click handlers', function () {
    return test(pathToHarness, 'parent', function (win) {
      win.$('#click-add').trigger('click');
    }).then((win) => {
      assert.equal(win.$('#msg').text(), '1');
      win.cleanup();
    });
  });
});
