import Vue from "vue";
import App from "./App.vue";
import "./plugin/element";
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
