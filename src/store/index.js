import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locale: "ru-RU",
    elements: [],
    solution: {},
  },
  mutations: {
    setLocale: (state, locale) => (state.locale = locale),
    setElements: (state, elements) => state.elements = elements,
    addElement: (state, element) => state.elements.unshift(element),
    deleteElementById: (state, id) => (state.elements = state.elements.filter((el) => el.id != id)),
    clearElements: (state) => (state.elements = []),
    setSolution: (state, solution) => state.solution = solution,
  },
  actions: {},
  modules: {},
  getters: {
    locale: (state) => state.locale,
    elements: (state) => state.elements,
    solution: (state) => state.solution,
  },
});
