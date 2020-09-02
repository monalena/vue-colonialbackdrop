// Vue libraries
/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
// import { Foundation } from "foundation-sites";

import "foundation-sites/dist/css/foundation.css";



Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
