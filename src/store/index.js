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
    addElement: (state, element) => (state.elements.unshift(element)),
    deleteElementById: (state, id) => (state.elements = state.elements.filter(el => el.id != id)),
  },
  actions: {},
  modules: {},
  getters: {
    locale: (state) => state.locale,
    elements: (state) => state.elements,
  },
});
