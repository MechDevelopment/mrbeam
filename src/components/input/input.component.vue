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
import circle from "../../shared/services/paper/circle";
export default {
  mounted() {
    circle("beam");
  },
};
</script>

<style lang="sass" scoped>
@import "../../styles.scss"
@import "./input.style.scss"
</style>
