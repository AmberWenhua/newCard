import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import { get, post } from '@tools/fetch'
import Vconsole from "vconsole"

import "@tools/rem"
import '@tools/wx/index'
import "@styles/reset.css"

const isProd = process.env.NODE_ENV === 'production';

if (!isProd || window.location.href.indexOf('debug=true') > -1) {
  let vConsole = new Vconsole();
  Vue.use(vConsole);
}

Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
