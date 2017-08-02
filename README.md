[![Build Status](https://travis-ci.org/rei/asset-tag-frag-webpack-plugin.svg?branch=master)](https://travis-ci.org/rei/asset-tag-frag-webpack-plugin)

# vue-test-utils

# Description

Vue test utils for running unit tests using jsdom &amp; mocha.

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

it('should do something amazing', function () {
    return test('path/to/harness', 'container-id').then((win) => {
      assert.ok(/* sommething */);
      win.cleanup();
    });
  });
```
The `then` callback will give you the `window` object with `$` and a `cleanup` function that should be called after each test to clean up `window` in between tests.

``` 
# Assumptions

- This assumes you are using webpack ^3.0.0. It has not been tested with older versions.