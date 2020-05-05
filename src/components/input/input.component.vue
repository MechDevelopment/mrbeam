<template>
  <div class="container">
    <div class="form">
      <span>
        <div class="button">Load</div>
        <div class="button">Random</div>
      </span>
      <canvas id="beam" resize="true"></canvas>
    </div>
    <Form></Form>
     </div>
</template>

<script>
import Form from "./form/form.component"

import {
  load,
  distload,
  moment,
  defenition,
  material,
} from "../../shared/services/paper/icons";
export default {
  mounted() {
    paper.setup(document.getElementById("beam"));
    load(30, 50, 30, new Color("#203752"));
    distload(90, 50, 30, 30, new Color("#203752"));
    moment(60, 50, 30, new Color("#203752"));
    defenition(140, 50, 30, new Color("#203752"));
    material(190, 50, 30, new Color("#203752"));

    let svg = project.exportSVG();
    console.log(svg)
  },
  components: {
    Form
  }
};
</script>

<style lang="sass" scoped>
@import "../../styles.scss"
@import "./input.style.scss"
</style>
