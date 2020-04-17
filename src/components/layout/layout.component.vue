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
        <div class="item main">
          <Render :vnode="component"></Render>
        </div>
      </div>
    </transition>

    <!-- DOTS BEHAVIOR -->

    <div v-if="layout.isTools()" class="dots">
      <button @click="queue.add(['left'])">LEFT</button>

      <span v-for="(component, index) in $slots.default" :key="index + 'dots'">
        <button @click="this.layout.dots(index, queue)">
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
  data: () => ({
    layout: undefined,
    queue: undefined,
  }),

  beforeMount() {
    this.layout = new Layout(this);
    this.queue = new Queue(
      {
        left: this.layout.left,
        right: this.layout.right,
      },
      400
    );

    this.layout.onResize();
  },

  mounted() {
    window.addEventListener("resize", this.layout.onResize());
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.layout.onResize());
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
