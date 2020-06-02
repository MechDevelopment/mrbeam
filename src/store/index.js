import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locale: "ru-RU",
    elements: [],
  },
  mutations: {
    setLocale: (state, locale) => (state.locale = locale),
    addElement: (state, element) => (state.elements.push(element)),
    //deleteElementById: (state, id) => (state.elements = ),
  },
  actions: {},
  modules: {},
  getters: {
    locale: (state) => state.locale,
    elements: (state) => state.elements,
  },
});
