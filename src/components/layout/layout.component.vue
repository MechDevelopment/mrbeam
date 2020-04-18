<template>
  <div>
    <!-- SLOTS BEHAVIOR -->
    <transition
      v-for="(component, index) in $slots.default"
      :key="index + 'component'"
      :duration="queue.getDuration()"
      :enter-active-class="
        layout.getDirection() == 'left'
          ? 'animated slideInLeft'
          : 'animated slideInRight'
      "
      :leave-active-class="
        layout.getDirection() == 'left'
          ? 'animated slideOutRight'
          : 'animated slideOutLeft'
      "
    >
      <div
        class="wrap"
        v-show="layout.getShow(index)"
        :style="layout.getStyle(index)"
      >
        <div class="item" :class="itemClass">
          <Render :vnode="component"></Render>
        </div>
      </div>
    </transition>

    <!-- DOTS BEHAVIOR -->
    <div v-if="layout.getControl()" class="dots">
      <button @click="queue.add(['left'])">LEFT</button>

      <span v-for="(component, index) in $slots.default" :key="index + 'dots'">
        <button @click="queue.add(layout.dots(index))">
          {{ layout.getShow(index) }}
        </button>
      </span>

      <button @click="queue.add(['right'])">RIGHT</button>
    </div>
  </div>
</template>

<script>
import Queue from "./services/Queue";
import Layout from "./services/Layout";

export default {
  props: ["item-class", "item-max-width"],

  data: () => ({
    layout: undefined,
    queue: undefined,
  }),

  beforeMount() {
    this.layout = new Layout(this.$slots.default.length, this.itemMaxWidth);
    this.queue = new Queue(
      {
        left: this.layout.left.bind(this.layout),
        right: this.layout.right.bind(this.layout),
      },
      400
    );
  },

  mounted() {
    window.addEventListener("resize", this.layout.rebuild.bind(this.layout));
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.layout.rebuild.bind(this.layout));
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
@import "./layout.style.scss"
</style>
