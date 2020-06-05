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
      <div class="button but-success">
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
    <span class="main" v-show="elements.length" id="svg_root"></span>
    <canvas v-show="false" id="beam" resize="true"></canvas>
  </div>
</template>

<script>
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
    this.updateBeam();
    // load(30, 50, 30, new Color("#203752"));
    // distload(90, 50, 30, 30, new Color("#203752"));
    // moment(60, 50, 30, new Color("#203752"));
    // defenition(140, 50, 30, new Color("#203752"));
    // material(190, 50, 30, new Color("#203752"));
    // let svg = project.exportSVG();
    // console.log(svg);
  },
  methods: {
    updateBeam() {
      paper.setup(document.getElementById("beam"));
      createBeam(Math.floor(Math.random() * Math.floor(100)), 100);

      if (document.getElementById("svg_root").children[0]) {
        document.getElementById("svg_root").children[0].remove();
      }

      document.getElementById("svg_root").appendChild(project.exportSVG());
    },
  },
};
</script>

<style lang="sass" scoped>
@import "./beam.style.scss"
</style>
