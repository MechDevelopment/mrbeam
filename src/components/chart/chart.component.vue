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
    Shear
    <div id="plotShear"></div>
    Moment
    <div id="plotMoment"></div>
    Displacement
    <div id="plotDisplacement"></div>
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
        });

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

      var data = [shear,  moment];

      Plotly.newPlot("plotShear", [shear]);
      Plotly.newPlot("plotMoment", [moment]);
    },
  },
};
</script>

<style lang="sass" scoped>
@import "./chart.style.scss"
</style>
