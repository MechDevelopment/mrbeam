export default {
  state: {
    isProcessing: true,
    points: [
      {
        id: 1,
        type: "Load",
        x: 3,
        load: 12
      },
      {
        id: 2,
        type: "Momentum",
        x: 12,
        load: 333
      },
      {
        id: 3,
        type: "Defenition",
        x: 78,
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
