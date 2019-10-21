import BeamService from "../services/BeamService.js";

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
        x: 2,
        load: 50
      },
      {
        id: 3,
        type: "Load",
        x: 8,
        load: -1000
      },
      {
        id: 4,
        type: "Defenition",
        x: 10,
        load: 0
      }
    ],
    result: {}
  },
  mutations: {
    ADD_POINT(state, point) {
      point.id = state.points.slice(-1)[0].id + 1;
      state.points = [...state.points, point];
    },
    DELETE_POINT(state, id) {
      let newPoints = state.points;
      console.log(newPoints);
      newPoints = newPoints.filter(point => point.id !== id);
      state.points = [...newPoints];
    },
    SET_POINTS(state, points) {
      state.points = [];
      state.points = [...points];
    },
    SET_RESULT(state, result) {
      state.result = result;
    }
  },
  getters: {
    getPoints: state => {
      return state.points;
    },
    getResult: state => {
      return state.result;
    }
  },
  actions: {
    deletePoint(id) {
      console.log(this.points.filter(point => point.id !== id));
    },
    generator(context, count) {
      let points = BeamService.generator(count);
      context.commit("SET_POINTS", points);
    },
    calculate(context) {
      context.commit("SET_PROCESSING", true);
      context.commit("SET_RESULT", {});

      let promise = new Promise(function(resolve, reject) {
        setTimeout(() => {
          let beamService = new BeamService();
          let points = [...context.getters.getPoints];
          beamService.import(points);
          let result = beamService.getResults();
          resolve(result);
        }, 1 * 100);
      });
      promise.then(result => {
        context.commit("SET_RESULT", result);
        context.commit("SET_PROCESSING", false);
      });
    }
  }
};
