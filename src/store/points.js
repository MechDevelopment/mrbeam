export default {
  state: {
    isProcessing: true,
    points: [
      {
        id: 1,
        type: "Defenition",
        x: 0,
        load: 1
      },
      {
        id: 2,
        type: "Load",
        x: 5,
        load: 100
      },
      {
        id: 3,
        type: "Defenition",
        x: 10,
        load: 0
      }
    ]
  },
  mutations: {
    ADD_POINT(state, point) {
      point.id = state.points.slice(-1)[0].id + 1;
      state.points = [...state.points, point];
    }
  },
  getters: {
    getPoints: state => {
      return state.points;
    }
  }
};
