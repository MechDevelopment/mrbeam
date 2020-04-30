<template>
  <div class="container">
    <div class="form">
      <span>
        <button>Load</button>
        <button>Random</button>
      </span>
      <canvas id="beam" resize="true"></canvas>
    </div>
    <Form></Form>
    <div><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="150" viewBox="0,0,300,150"><defs><symbol viewBox="-4.6,-30,9.2,30" id="symbol-1"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,0l4.6,-10.5l-4.6,1.5l-4.6,-1.5" fill="#203752" stroke="none" stroke-width="1"></path><path d="M0,-7v-23" fill="none" stroke="#203752" stroke-width="4"></path></g></symbol><symbol viewBox="-4.6,-30,9.2,30" id="symbol-2"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,0l4.6,-10.5l-4.6,1.5l-4.6,-1.5" fill="#203752" stroke="none" stroke-width="1"></path><path d="M0,-7v-23" fill="none" stroke="#203752" stroke-width="4"></path></g></symbol></defs><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><use x="25.4" y="20" xlink:href="#symbol-1" width="9.2" height="30" overflow="visible" fill="none" stroke="none" stroke-width="1"></use><use x="45.4" y="20" xlink:href="#symbol-2" width="9.2" height="30" overflow="visible" fill="none" stroke="none" stroke-width="1"></use><use x="60.4" y="20" xlink:href="#symbol-2" width="9.2" height="30" overflow="visible" fill="none" stroke="none" stroke-width="1"></use><use x="75.4" y="20" xlink:href="#symbol-2" width="9.2" height="30" overflow="visible" fill="none" stroke="none" stroke-width="1"></use><path d="M48,22h34" fill="none" stroke="#203752" stroke-width="4"></path><path d="M116.5,46.25833c-6.2178,3.58985 -14.16848,1.45947 -17.75833,-4.75833c-3.58985,-6.2178 -1.45947,-14.16848 4.75833,-17.75833c6.2178,-3.58985 14.16848,-1.45947 17.75833,4.75833" fill="none" stroke="#203752" stroke-width="4"></path><path d="M124.97064,31.96231l-4.17193,-10.67731l-2.19203,4.31335l-4.31335,2.19203" fill="#203752" stroke="none" stroke-width="1"></path><path d="M138.25962,46.25l12.99038,-22.5l12.99038,22.5z" fill="none" stroke="#203752" stroke-width="4"></path><path d="M131.25,46.25h40" fill="none" stroke="#203752" stroke-width="4"></path><path d="M133.25,54.25l5,-8" fill="none" stroke="#203752" stroke-width="3"></path><path d="M143.25,54.25l5,-8" fill="none" stroke="#203752" stroke-width="3"></path><path d="M153.25,54.25l5,-8" fill="none" stroke="#203752" stroke-width="3"></path><path d="M163.25,54.25l5,-8" fill="none" stroke="#203752" stroke-width="3"></path><path d="M190,20l6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M191,25l-6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M200,20l6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M201,25l-6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M210,20l6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M211,25l-6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M190,30l6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M191,35l-6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M200,30l6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M201,35l-6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M210,30l6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M211,35l-6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M190,40l6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M191,45l-6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M200,40l6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M201,45l-6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M210,40l6,6" fill="none" stroke="#203752" stroke-width="3"></path><path d="M211,45l-6,6" fill="none" stroke="#203752" stroke-width="3"></path></g></svg></div>
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
