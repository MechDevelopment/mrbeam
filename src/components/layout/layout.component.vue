<template>
  <div>
    <!-- SLOTS BEHAVIOR -->
    <transition
      v-for="(component, index) in $slots.default"
      :key="index + 'component'"
      name="fade"
      :duration="queue.getDuration()"
      :enter-active-class="
        direction == 'left' ? 'animated slideInLeft' : 'animated slideInRight'
      "
      :leave-active-class="
        direction == 'left' ? 'animated slideOutRight' : 'animated slideOutLeft'
      "
    >
      <div
        v-show="show_slots[index]"
        class="wrap"
        :style="wrap_style[direction][index]"
      >
        <div class="item main">
          <Render :vnode="component"></Render>
        </div>
      </div>
    </transition>

    <!-- DOTS BEHAVIOR -->
    <div v-if="tools" class="dots">
      <button @click="queue.add('left')">LEFT</button>
      {{ show_slots }}
      <button @click="queue.add('right')">RIGHT</button>
    </div>
  </div>
</template>

<script>
import Queue from "./services/Queue";

export default {
  data: () => ({
    count_of_slots: undefined,
    first_active_slot: 0,

    show_slots: undefined,
    wrap_style: { left: undefined, right: undefined },

    direction: "left",
    timer: undefined,
    tools: true,

    queue: undefined,
  }),

  created() {
    this.onResize();

    this.queue = new Queue({
      left: () => {
        this.direction = "left";
        this.show_slots.push(this.show_slots.shift());
        let s = this.show_slots;
        this.show_slots = [0, 0, 0, 0];

        setTimeout(() => {
          this.wrap_style.right.push(this.wrap_style.right.shift());
          this.wrap_style.left.push(this.wrap_style.left.shift());
          this.show_slots = s;

   
        });
      },
      right: () => {
        this.direction = "right";
        this.show_slots.unshift(this.show_slots.pop());
        let s = this.show_slots;
        this.show_slots = [0, 0, 0, 0];

        setTimeout(() => {
          this.wrap_style.right.unshift(this.wrap_style.right.pop());
          this.wrap_style.left.unshift(this.wrap_style.left.pop());
          this.show_slots = s;

        });
      },
    }, 400);
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
      this.wrap_style = { left: [], right: [] };
      let j = 0;
      let left = "0%";
      for (let i = 0; i < n; i++) {
        // direction left
        if (this.show_slots[i] == 1 || j == m) {
          if (j == m) left = `${(100 / m) * (j - 1)}%`;
          else left = `${(100 / m) * j}%`;
        } else {
          left = "0%";
        }
        this.wrap_style.left.push({
          width: `${100 / m}%`,
          left: left,
        });
        // direction right

        if (this.show_slots[i] == 1 || j == m) {
          if (j == m) left = `${(100 / m) * 0}%`;
          else left = `${(100 / m) * j}%`;
        } else {
          left = "0%";
        }

        j++;

        this.wrap_style.right.push({
          width: `${100 / m}%`,
          left: left,
        });
      }

      console.log(this.show_slots, this.wrap_style);
    },

    onResize() {
      const N = this.$slots.default.length;
      let m = this.count_of_slots;
      this.count_of_slots = Math.ceil(window.innerWidth / 800);
      this.tools = N == this.count_of_slots ? false : true;

      if (m != this.count_of_slots) {
        this.buildData(N, this.count_of_slots);
      }
    },
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
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
