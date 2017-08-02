/* eslint-disable prefer-arrow-callback */
/* eslint-env node, mocha, browser */

const assert = require('assert');
const test = require('../src/index').test(__dirname);
const item = require('./harness/component-data');
const path = require('path');

describe('Vue test utils', () => {
  it('takes callback with window, trigger function', function () {
    return test('../test/harness/parent.vue', '../test/harness/component-data').then((win) => {
      assert.ok(win);
      assert.ok(win.trigger);
    });
  });

  it('should render components with children', function () {
    return test('../test/harness/parent.vue', '../test/harness/component-data').then((win) => {
      assert.equal(win.document.querySelector('#div1').textContent, 'div1');
    });
  });

  it('should render components with data', function () {
    return test('../test/harness/parent.vue', '../test/harness/component-data').then((win) => {
      assert.equal(win.document.querySelector('#div2').textContent, item.x);
      win.x = 1;
    });
  });

  it('clean up window', function () {
    return test('../test/harness/parent.vue', '../test/harness/component-data').then((win) => {
      assert.ok(!win.x);
    });
  });

  it('update dom per Vue dom event click handlers', function () {
    return test('../test/harness/parent.vue', '../test/harness/component-data', function (win) {
      win.trigger('click', win.document.querySelector('#click-add'));
    }).then((win) => {
      assert.equal(win.document.querySelector('#msg').innerHTML, '1');
    });
  });

  it('should not retain component state', function () {
    return test('../test/harness/parent.vue', '../test/harness/component-data', function (win) {
      win.trigger('click', win.document.querySelector('#click-add'));
    }).then((win) => {
      assert.equal(win.document.querySelector('#msg').innerHTML, '1');
    });
  });
});
