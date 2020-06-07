<template>
  <div class="wrap-canvas">
    <span class="wrap-buttons" v-show="!elements.length">
      <div class="button but-success">
        <span
          class="iconify"
          data-icon="ant-design:cloud-upload-outlined"
          data-inline="false"
          data-width="20"
          data-height="20"
        ></span>
        {{ "L_Load" | localize }}
      </div>
      <div class="button but-success" @click="clickRandom">
        <span
          class="iconify"
          data-icon="fa-solid:dice"
          data-inline="false"
          data-width="20"
          data-height="20"
        ></span>
        {{ "L_Random" | localize }}
      </div>
    </span>
    <!-- <span class="main" v-show="elements.length" id="svg_root"></span> -->
    <canvas id="beam" resize="true"></canvas>
  </div>
</template>

<script>
// CONST
const CANVAS_HEIGHT = 150;

import { mapGetters } from "vuex";

import {
  load,
  distload,
  moment,
  defenition,
  material,
} from "../../../shared/services/paper/icons";

import { createBeam } from "../../../shared/services/paper/beam";

export default {
  data: () => ({
    beamSVG: undefined,
  }),
  computed: {
    ...mapGetters(["elements"]),
  },
  mounted() {
    // Listeners
    window.addEventListener("resize", this.onResize);

    // Connect paper js
    paper.setup(document.getElementById("beam"));
  },

  methods: {
    updateBeam() {
      project.clear();

      setTimeout(() => {
        // Check size
        const WIDTH = document.getElementById("beam").offsetWidth;
        project.view.setViewSize(new Size(WIDTH, CANVAS_HEIGHT));

        createBeam(0, 0, WIDTH, CANVAS_HEIGHT);
      });
    },

    onResize() {
      if (this.elements.length) this.updateBeam();
    },

    clickRandom() {
      const URL = "https://mrbeam2.herokuapp.com/generate"
      fetch(URL)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.$store.commit("setElements", data);
        });
    },
  },

  watch: {
    elements() {
      // Clean the project if there are no elements
      if (!this.elements.length) project.clear();
      else this.updateBeam();
    },
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style lang="sass" scoped>
@import "./beam.style.scss"
</style>
