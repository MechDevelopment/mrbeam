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
        direction == 'left' ? 'animated slideInLeft' : 'animated slideInRight'
      "
      :leave-active-class="
        direction == 'left' ? 'animated slideOutRight' : 'animated slideOutLeft'
      "
    >
      <div v-show="show_slots[index]" class="wrap" :style="wrap_style[index]">
        <div class="item main">
          <Render :vnode="component"></Render>
        </div>
      </div>
    </transition>

    <div class="dots">
      <button @click="left">LEFT</button>
      {{ show_slots }}
      <button @click="right">RIGHT</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    count_of_slots: undefined,
    first_active_slot: 0,

    show_slots: undefined,
    wrap_style: undefined,

    direction: "left",
    
    commands: [],
    timer: undefined,
    duration: 1000,
  }),

  created() {
    this.onResize();
  },

  methods: {
    buildData(n, m) {
      // build show_slots
      this.show_slots = [];
      for (let i = 0; i < n; i++) {
        if (i < m) this.show_slots.push(1);
        else this.show_slots.push(0);
      }

      // build wrap_style
      this.wrap_style = [];
      let j = 0;
      let left = "0%";
      for (let i = 0; i < n; i++) {
        if (this.show_slots[i] == 1 || j == m) {
          if (j == m) left = `${(100 / m) * (j - 1)}%`;
          else left = `${(100 / m) * j}%`;
          j++;
        } else {
          left = "0%";
        }
        this.wrap_style.push({
          width: `${100 / m}%`,
          left: left,
        });
      }

      console.log(this.show_slots, this.wrap_style);
    },

    onResize() {
      if (window.innerWidth > 800) {
        this.count_of_slots = 2;
      } else {
        this.count_of_slots = 1;
      }

      console.log("n, m", this.$slots.default.length, this.count_of_slots);

      this.buildData(this.$slots.default.length, this.count_of_slots);
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
      this.direction = "left";
      this.show_slots.push(this.show_slots.shift());
      let s = this.show_slots;
      this.show_slots = [0, 0, 0, 0];

      setTimeout(() => {
        this.wrap_style.push(this.wrap_style.shift());
        this.show_slots = s;
      });

      console.log(this.wrap_style);
    },

    r() {
      this.direction = "right";
      this.show_slots.unshift(this.show_slots.pop());
      let s = this.show_slots;
      this.show_slots = [0, 0, 0, 0];

      setTimeout(() => {
        this.wrap_style.unshift(this.wrap_style.pop());
        this.show_slots = s;
      });

      console.log(this.wrap_style);
    },
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  watch: {
    m(key) {
      setTimeout(() => {
        if (key == 1) {
          this.wrap_style = ["", "", "", ""];
        } else {
          for (let i = 0; i < this.$slots.default.length; i++) {
            this.wrap_style[i] = `width: ${100 / this.count_of_elems - 4}%;`;
          }
        }
      });
    },
  },

  components: {
    // Component for rendering $slots items
    Render: {
      functional: true,
      render: (h, ctx) => ctx.props.vnode,
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../../styles.scss"
@import "./layout.style.scss"
</style>
