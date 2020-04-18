import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locale: "ru-RU",
  },
  mutations: {
    setLocale: (state, locale) => (state.locale = locale),
  },
  actions: {},
  modules: {},
  getters: {
    locale: (state) => state.locale,
  },
});
