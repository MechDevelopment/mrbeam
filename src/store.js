import Vue from "vue";
import Vuex from "vuex";
// import userModule from './store/user';
import generalModule from "./store/general";
import pointsModule from "./store/points";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    generalModule,
    pointsModule
  }
});
