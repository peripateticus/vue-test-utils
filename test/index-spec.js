/* eslint-disable prefer-arrow-callback */
/* eslint-env node, mocha, browser */

const assert = require('assert');
const test = require('../src/index').test;
const item = require('./harness/component-data');
const path = require('path');

describe('Vue test utils', () => {
  const pathToHarness = path.resolve(__dirname, './harness/vue-main');

  it('Pass take callback with window, $', function () {
    return test(pathToHarness, 'parent').then((win) => {
      assert.ok(win);
      assert.ok(win.$);
    });
  });

  it('should render components with children', function () {
    return test(pathToHarness, 'parent').then((win) => {
      assert.equal(win.document.querySelector('#div1').textContent, 'div1');
    });
  });

  it('should render components with data', function () {
    return test(pathToHarness, 'parent').then((win) => {
      assert.equal(win.document.querySelector('#div2').textContent, item.x);
      win.x = 1;
    });
  });

  it('clean up window', function () {
    return test(pathToHarness, 'parent').then((win) => {
      assert.ok(!win.x);
    });
  });

  it('update dom per Vue dom event click handlers', function () {
    return test(pathToHarness, 'parent', function (win) {
      win.$('#click-add').trigger('click');
    }).then((win) => {
      assert.equal(win.$('#msg').text(), '1');
    });
  });

  it('update dom per Vue dom event click handlers', function () {
    return test(pathToHarness, 'parent', function (win) {
      win.$('#click-add').trigger('click');
    }).then((win) => {
      assert.equal(win.$('#msg').text(), '1');
    });
  });

  it('should not retain component state', function () {
    return test(pathToHarness, 'parent', function (win) {
      win.$('#click-add').trigger('click');
    }).then((win) => {
      assert.equal(win.$('#msg').text(), '1');
    });
  });
});
