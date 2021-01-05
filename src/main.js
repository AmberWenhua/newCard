import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import Vconsole from "vconsole"

import "@tools/rem"
import '@tools/wx/index'
import "@styles/reset.css"
import '@tools/bus'
import 'vant/lib/index.css'

const isProd = process.env.NODE_ENV === 'production';

if (!isProd || window.location.href.indexOf('debug=true') > -1) {
  let vConsole = new Vconsole();
  Vue.use(vConsole);
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
