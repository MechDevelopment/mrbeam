<template>
  <div class="wrap-canvas">
    <span class="wrap-buttons">
      <div class="button but-success">
        <span
          class="iconify"
          data-icon="ant-design:cloud-upload-outlined"
          data-inline="false"
          data-width="20"
          data-height="20"
        ></span
        > {{"L_Load" | localize}}
      </div>
      <div class="button but-success">
        <span
          class="iconify"
          data-icon="fa-solid:dice"
          data-inline="false"
          data-width="20"
          data-height="20"
        ></span
        > {{"L_Random" | localize}}
      </div>
    </span>
    <!-- <canvas id="beam" resize="true"></canvas> -->
  </div>
</template>

<script>
import {
  load,
  distload,
  moment,
  defenition,
  material,
} from "../../../shared/services/paper/icons";
export default {
  mounted() {
    // paper.setup(document.getElementById("beam"));
    // load(30, 50, 30, new Color("#203752"));
    // distload(90, 50, 30, 30, new Color("#203752"));
    // moment(60, 50, 30, new Color("#203752"));
    // defenition(140, 50, 30, new Color("#203752"));
    // material(190, 50, 30, new Color("#203752"));
    // let svg = project.exportSVG();
    // console.log(svg);
  },
};
</script>

<style lang="sass" scoped>
@import "./beam.style.scss"
</style>
