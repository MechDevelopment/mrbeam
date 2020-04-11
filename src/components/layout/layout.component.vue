<template>
  <div class="container">
    <link
      href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
      rel="stylesheet"
      type="text/css"
    />

    <transition
      v-for="(component, index) in components"
      :key="component"
      name="fade"
      :enter-active-class="
        anim == 'left' ? 'animated slideInLeft' : 'animated slideInRight'
      "
      :leave-active-class="
        anim == 'left' ? 'animated slideOutRight' : 'animated slideOutLeft'
      "
    >
      <div v-show="show[index]" class="toggle" :style="toggle_style[index] + t_s[index]">
        <component v-bind:is="component" class="item main"></component>
      </div>
    </transition>

    <div class="dots">
      <button @click="left">LEFT</button>
      {{ show }}
      <button @click="right">RIGHT</button>
    </div>
  </div>
</template>

<script>
import Info from "../info/info.component";
import Input from "../input/input.component";
import Chart from "../chart/chart.component";
import Data from "../data/data.component";

export default {
  data: () => ({
    components: ['Info', 'Input', 'Chart', 'Data'],
    n: 4,
    m: undefined,
    show: [0, 1, 1, 0],
    anim: "left",
    toggle_style: ["width: 50%", "width: 50%", "width: 50%", "width: 50%"],
    t_s: ["", "left: 0%", "left: 50%", "left: 50%"]
  }),

  created() {
    this.onResize();
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      if (window.innerWidth > 800) {
        this.m = 2;
      } else {
        this.m = 1;
      }
    },

    left() {
      this.anim = "left";
      this.show.push(this.show.shift());
      let s = this.show;
      this.show = [0, 0, 0, 0];
      

      setTimeout(() => {
        this.t_s.push(this.t_s.shift());
        this.show = s;
      });

      
    },

    right() {
      this.anim = "right";
      this.show.unshift(this.show.pop());
      let s = this.show;
      this.show = [0, 0, 0, 0];
      

      setTimeout(() => {
        this.t_s.unshift(this.t_s.pop());
        this.show = s;
      });

     
      console.log(this.t_s);
    }
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  watch: {
    m(key) {
      setTimeout(() => {
        if (key == 1) {
          this.toggle_style = ["", "", "", ""];
        } else {
          for (let i = 0; i < this.n; i++) {
            this.toggle_style[i] = `width: ${100 / this.m}%;`;
          }
        }
        console.log(this.toggle_style);
      });
    }
  },

  components: {
    Info,
    Input,
    Chart,
    Data
  }
};
</script>

<style lang="sass" scoped>
@import "../../styles.scss"
@import "./layout.style.scss"
</style>
