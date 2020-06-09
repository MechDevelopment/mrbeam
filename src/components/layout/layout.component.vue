<template>
  <div id="divapp">
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
        :style="
          layout.getCountVisible() == 1
            ? Object.assign(
                { height: 'calc(100% - 40px)' },
                layout.getStyle(index)
              )
            : Object.assign({ height: '100%' }, layout.getStyle(index))
        "
      >
        <div class="item" :class="itemClass">
          <Render :vnode="component"></Render>
        </div>
      </div>
    </transition>

    <!-- DOTS BAR -->
    <div v-if="layout.getCountVisible() != 1" class="dots-bar">
      <button @click="queue.add(['left'])">LEFT</button>

      <span v-for="(component, index) in $slots.default" :key="index + 'dots'">
        <button @click="queue.add(layout.dots(index))">
          {{ layout.getShow(index) }}
        </button>
      </span>

      <button @click="queue.add(['right'])">RIGHT</button>
    </div>

    <!-- PHONE BAR -->
    <div v-else class="phone-bar main">
      <span v-for="(component, index) in $slots.default" :key="index + 'dots'">
        <span class="" @click="queue.add(layout.dots(index))">
          <span v-show="layout.getShow(index) == 0"
            ><span
              class="iconify"
              :data-icon="icon[index][0]"
              data-inline="false"
              data-width="25"
              data-height="25"
            ></span
          ></span>

          <span v-show="layout.getShow(index) != 0">
            <span
              class="iconify"
              :data-icon="icon[index][1]"
              data-inline="false"
              data-width="25"
              data-height="25"
            ></span
          ></span>

          <!-- {{ layout.getShow(index) }} -->
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import Queue from "./services/Queue";
import Layout from "./services/Layout";

export default {
  props: ["item-class", "item-max-width"],

  data: () => ({
    icon: [
      ["clarity-file-group-line", "clarity-file-group-solid"],
      ["clarity-calculator-line", "clarity-calculator-solid"],
      ["clarity-analytics-line", "clarity-analytics-solid"],
      ["clarity-clipboard-line", "clarity-clipboard-solid"],
    ],
    layout: undefined,
    queue: undefined,
    xDown: null,
    yDown: null,
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
    const divapp = document.getElementById("divapp");
    window.addEventListener(
      "resize",
      this.layout.rebuild.bind(this.layout),
      false
    );
    divapp.addEventListener("touchstart", this.handleTouchStart, false);
    divapp.addEventListener("touchmove", this.handleTouchMove, false);

    document.onkeydown = (e) => {
      if (e.target.className == "input") return;

      switch (e.keyCode) {
        case 37:
          this.queue.add(["left"]);
          break;
        case 39:
          this.queue.add(["right"]);
          break;
      }
    };
  },

  methods: {
    handleTouchStart(evt) {
      const firstTouch = evt.touches[0] || evt.originalEvent.touches[0];
      this.xDown = firstTouch.clientX;
      this.yDown = firstTouch.clientY;
    },

    handleTouchMove(evt) {
      if (!this.xDown || !this.yDown) return;

      let xDiff = this.xDown - evt.touches[0].clientX;
      let yDiff = this.yDown - evt.touches[0].clientY;

      if (Math.abs(xDiff) > 25) {
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) this.queue.add(["right"]);
          else this.queue.add(["left"]);
        }
      } else {
        return;
      }

      this.xDown = null;
      this.yDown = null;
    },
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.layout.rebuild.bind(this.layout));
    document.removeEventListener("touchstart", this.handleTouchStart, false);
    document.removeEventListener("touchmove", this.handleTouchMove, false);
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
