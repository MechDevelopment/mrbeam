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
      <div v-show="show[0]" class="toggle">
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
      <div v-show="show[1]" class="toggle">
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
      <div v-show="show[2]" class="toggle">
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
      <div v-show="show[3]" class="toggle">
        <div class="item main">3</div>
      </div>
    </transition>

    <div class="dots">
      <button @click="left">LEFT</button>
      {{show}}
      <button @click="right">RIGHT</button>
    </div>
  </div>
</template>

<script>
import Info from "../info/info.component"
export default {
  data: () => ({
    n: 4,
    m: 1,
    show: [0, 1, 0, 0],
    anim: "left"
  }),

  methods: {
    left() {
      this.anim = "left";
      const index = this.show.findIndex(e => e == 1);
      this.show = this.show.map((e, i) => {
        if (i == index - 1) {
          return 1;
        } else {
          return 0;
        }
      });
    },

    right() {
      this.anim = "right";
      const index = this.show.findIndex(e => e == 1);
      this.show = this.show.map((e, i) => {
        if (i == index + 1) {
          return 1;
        } else {
          return 0;
        }
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
