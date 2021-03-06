[![Build Status](https://travis-ci.org/peripateticus/vue-test-utils.svg?branch=master)](https://travis-ci.org/peripateticus/vue-test-utils)

# vue-test-utils

# Description

Mocha test utility for running unit tests against your [Vue.js](https://vuejs.org/) component within jsdom.

# Usage

## Installation
```bash
npm install
```

## Basic Usage
1. Create a test harness file instantiating your Vue component. See [here](https://github.com/peripateticus/vue-test-utils/blob/master/test/harness/vue-main.js) for example.
2. In your `mocha` spec files' test blocks, call the `vueUtils.test()` function as follows, referencing above harness:

```javascript
// index-spec.js
const vueUtils = require('vue-test-utils');
.
.
it('should do something amazing', function () {
    return test('path/to/harness', 'container-id').then((win) => {
      assert.ok(/* something */);
    });
  });
.
.
```
See [unit tests](https://github.com/peripateticus/vue-test-utils/blob/master/test/index-spec.js) for examples.

The `then` callback will give you access to the [`window` object with jQuery](https://github.com/peripateticus/vue-test-utils/blob/master/test/index-spec.js#L40) for use in your tests.

## Test function API

```javascript
test(pathToHarness, containerId, cb).then(win => { /* Assertions */ })
```

* `pathToHarness` {String} File path (absolute) to your vue test harness.

* `containerId` {String} The DOM element's id where your parent component will be inserted. (The same id as in your harness). 

* `eventTriggerFn` {Function} Callback that you can use to trigger DOM events prior to assertions.


## Event Triggering callback
If you want to trigger an event on the DOM prior to your running assertions in the `then` callback, do so in the callback provided in `test`'s [3rd argument](https://github.com/peripateticus/vue-test-utils/blob/master/test/index-spec.js#L39).

## Todo
* Improve run time.
* Investigate removing need for the harness.
