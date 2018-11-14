/*
 * @Author: yellowDog 
 * @Date: 2018-10-11 10:33:50 
 * @Last Modified by:   yellowDog 
 * @Last Modified time: 2018-10-11 10:33:50 
 */
import Vue from "vue";
import App from "./App.vue";
import "./plugin/element";
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
