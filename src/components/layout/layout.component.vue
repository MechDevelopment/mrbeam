<template>
  <div>
    <link
      href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
      rel="stylesheet"
      type="text/css"
    />
    <transition
      v-for="(component, index) in $slots.default"
      :key="index + 'component'"
      name="fade"
      :enter-active-class="
        anim == 'left' ? 'animated slideInLeft' : 'animated slideInRight'
      "
      :leave-active-class="
        anim == 'left' ? 'animated slideOutRight' : 'animated slideOutLeft'
      "
    >
      <div
        v-show="show[index]"
        class="toggle"
        :style="toggle_style[index] + t_s[index]"
      >
        <div class="item main">
          <Render :vnode="component"></Render>
        </div>
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
export default {
  data: () => ({
    components: ["Info", "Input", "Chart", "Data"],
    n: 4,
    m: undefined,
    show: [0, 1, 1, 0],
    anim: "left",
    toggle_style: ["width: 46%", "width: 46%", "width: 46%", "width: 46%"],
    t_s: ["", "left: 4%", "left: 50%", "left: 50%"],
    commands: [],
    timer: undefined,
    duration: 1000,
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
      if (this.commands.length < 1) {
        this.commands.push(this.l);
        this.go();
      }
    },

    right() {
      if (this.commands.length < 1) {
        this.commands.push(this.r);
        this.go();
      }
    },

    go() {
      if (!this.timer) {
        if (this.commands) {
          this.duration = 1200;
          const command = this.commands.shift()();

          this.timer = setTimeout(() => {
            this.timer = undefined;
            this.go();
          }, this.duration);
        }
      }
    },

    l() {
      this.anim = "left";
      this.show.push(this.show.shift());
      let s = this.show;
      this.show = [0, 0, 0, 0];

      setTimeout(() => {
        this.t_s.push(this.t_s.shift());
        this.show = s;
      });
    },

    r() {
      this.anim = "right";
      this.show.unshift(this.show.pop());
      let s = this.show;
      this.show = [0, 0, 0, 0];

      setTimeout(() => {
        this.t_s.unshift(this.t_s.pop());
        this.show = s;
      });
    },
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
            this.toggle_style[i] = `width: ${100 / this.m - 4}%;`;
          }
        }
        console.log(this.toggle_style);
      });
    },
  },

  components: {
    Render: {
      functional: true,
      render: (h, ctx) => ctx.props.vnode
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../../styles.scss"
@import "./layout.style.scss"
</style>
