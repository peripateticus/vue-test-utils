// Harness file that contains instance of 
// parent component.
const Vue = require('vue');

// Parent component.
const component = require('./parent.vue');

// Turn off tips.
Vue.config.productionTip = false;

// Instantiate component with data.
new Vue({
  el: '#parent',
  render(createElement) {
    return createElement(component, {
      props: {
        item: require('./component-data'),
      },
    });
  },
});
