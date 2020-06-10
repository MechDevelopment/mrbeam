<template>
  <div class="container">
    <div
      v-show="this.elements.length"
      class="button but-success"
      @click="clickCalculate"
    >
      <span
        class="iconify"
        data-icon="clarity:calculator-line"
        data-inline="false"
        data-width="20"
        data-height="20"
      ></span>
      {{ "L_Calculate" | localize }}
    </div>

    <div id="plotShear"></div>
    Shear

    <div id="plotMoment"></div>
    Moment

    <div id="plotDisplacement"></div>
    Displacement

    <div id="plotSlope"></div>
    Slope
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["solution", "elements"]),
  },

  methods: {
    clickCalculate() {
      const URL = "https://mrbeam2.herokuapp.com/calculate";
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },

        body: JSON.stringify(this.elements),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.$store.commit("setSolution", data);

          console.log(this.solution);
          let shear = {
            x: this.solution.labels,
            y: this.solution.shear,
            type: "scatter",
          };

          let moment = {
            x: this.solution.labels,
            y: this.solution.moment,
            type: "scatter",
          };

          let displacement = {
            x: this.solution.labels,
            y: this.solution.displacement,
            type: "scatter",
          };

          let slope = {
            x: this.solution.labels,
            y: this.solution.slopeDegrees,
            type: "scatter",
          }

          Plotly.newPlot("plotShear", [shear]);
          Plotly.newPlot("plotMoment", [moment]);
          Plotly.newPlot("plotDisplacement", [displacement]);
          Plotly.newPlot("plotSlope", [slope]);
        });
    },
  },
};
</script>

<style lang="sass" scoped>
@import "./chart.style.scss"
</style>
