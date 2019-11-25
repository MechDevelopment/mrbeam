import { resolve } from "q";

class TestService {
  constructor() {
    this.results;
  }

  static get(coeff) {
    return new Promise((resolve, rej) => {
      const successObject = {
        msg: "Success" + coeff
      };
      resolve(successObject);
    });
  }
}

export default TestService;
