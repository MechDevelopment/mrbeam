import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NewBeam from "./views/NewBeam.vue";
import NewBeam2 from "./views/NewBeam2.vue";

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
    },
    {
      path: "/newbeam2",
      name: "newbeam2",
      component: NewBeam2
    }
  ]
});
