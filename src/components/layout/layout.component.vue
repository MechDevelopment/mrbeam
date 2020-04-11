<template>
  <div class="container">
    <link
      href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
      rel="stylesheet"
      type="text/css"
    />

    <transition
      name="fade"
      :enter-active-class="
        anim == 'left' ? 'animated slideInLeft' : 'animated slideInRight'
      "
      :leave-active-class="
        anim == 'left' ? 'animated slideOutRight' : 'animated slideOutLeft'
      "
    >
      <div v-show="show[0]" class="toggle" :style="toggle_style[0] + t_s[0]">
        <Info class="item main"></Info>
      </div>
    </transition>

    <transition
      name="fade"
      :enter-active-class="
        anim == 'left' ? 'animated slideInLeft' : 'animated slideInRight'
      "
      :leave-active-class="
        anim == 'left' ? 'animated slideOutRight' : 'animated slideOutLeft'
      "
    >
      <div v-show="show[1]" class="toggle" :style="toggle_style[1] + t_s[1]">
        <div class="item main">1</div>
      </div>
    </transition>

    <transition
      name="fade"
      :enter-active-class="
        anim == 'left' ? 'animated slideInLeft' : 'animated slideInRight'
      "
      :leave-active-class="
        anim == 'left' ? 'animated slideOutRight' : 'animated slideOutLeft'
      "
    >
      <div v-show="show[2]" class="toggle" :style="toggle_style[2] + t_s[2]">
        <div class="item main">2</div>
      </div>
    </transition>

    <transition
      name="fade"
      :enter-active-class="
        anim == 'left' ? 'animated slideInLeft' : 'animated slideInRight'
      "
      :leave-active-class="
        anim == 'left' ? 'animated slideOutRight' : 'animated slideOutLeft'
      "
    >
      <div v-show="show[3]" class="toggle" :style="toggle_style[3] + t_s[3]">
        <div class="item main">3</div>
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
export default {
  data: () => ({
    n: 4,
    m: undefined,
    show: [0, 1, 1, 0],
    anim: "left",
    toggle_style: ["", "", "", ""],
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
      this.show = [0,0,0,0];
      this.t_s.push(this.t_s.shift());
      
      setTimeout(() => {
        this.show = s;
      });
      
    },

    right() {
      this.anim = "right";
      this.show.unshift(this.show.pop());
      let s = this.show;
      this.show = [0,0,0,0];
      this.t_s.unshift(this.t_s.pop());

      setTimeout(() => {
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
    Info
  }
};
</script>

<style lang="sass" scoped>
@import "../../styles.scss"
@import "./layout.style.scss"
</style>
