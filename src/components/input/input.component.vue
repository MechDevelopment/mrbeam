<template>
  <div class="container">
    <div class="form">
      <span>
        <button>Load</button>
        <button>Random</button>
      </span>
      <canvas id="beam" resize="true"></canvas>
    </div>
    <div class="form">
      <span class="toolset">
        <button>Load</button>
        <button>Moment</button>
        <button>Dist</button>
        <button>Def</button>
        <button>Mat</button>
      </span>
      <div></div>
      <span class="toolset">
        <button>x</button>
        <input />
        <div></div>
        <button>p</button>
        <input />
      </span>
    </div>
  </div>
</template>

<script>
import { load, distload, moment } from "../../shared/services/paper/icons";
export default {
  mounted() {
    paper.setup(document.getElementById("beam"));
    load(30, 50, 30, new Color("pink"));
    distload(50, 50, 30, 30, new Color("lightblue"));
    moment(110, 50, 30, new Color("lightgreen"))
  },
};
</script>

<style lang="sass" scoped>
@import "../../styles.scss"
@import "./input.style.scss"
</style>
