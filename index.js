const calendarComponent = require('./index.vue');
const calendar = {
  install:function(Vue) {
    Vue.component('vue-calendar', calendarComponent);
  },
};
module.exports = calendar;

/**
 * Created by Administrator on 2017/5/3.
 */
