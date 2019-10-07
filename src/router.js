import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NewBeam from "./views/NewBeam.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/newbeam",
      name: "newbeam",
      component: NewBeam
    }
  ]
});
