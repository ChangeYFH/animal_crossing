import Vue from "vue";
import App from "./App";
import router from "./router";
import VueResource from "vue-resource";

import "swiper/css/swiper.css";

import "@/assets/scss/_index.scss";

Vue.config.productionTip = false;

Vue.use(VueResource);

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

