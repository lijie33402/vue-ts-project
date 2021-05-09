import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
// 测试vue应用的性能
const isDev = process.env.NODE_ENV !== 'production';
Vue.config.performance = isDev;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
