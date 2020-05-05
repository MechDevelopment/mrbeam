<template>
  <div class="form">
    <span class="toolset">
      <div :class="unitNumber == 0 ? 'main-invert' : 'main'" @click="clickLoad">
        <div
          class="icon-load svg-icon"
          :class="unitNumber == 0 ? 'main' : 'main-invert'"
        ></div>
      </div>
      <div
        :class="unitNumber == 1 ? 'main-invert' : 'main'"
        @click="clickMoment"
      >
        <div
          class="icon-load svg-icon"
          :class="unitNumber == 1 ? 'main' : 'main-invert'"
        ></div>
      </div>
      <div
        :class="unitNumber == 2 ? 'main-invert' : 'main'"
        @click="clickDistload"
      >
        <div
          class="icon-load svg-icon"
          :class="unitNumber == 2 ? 'main' : 'main-invert'"
        ></div>
      </div>
      <div
        :class="unitNumber == 3 ? 'main-invert' : 'main'"
        @click="clickDefenition"
      >
        <div
          class="icon-load svg-icon"
          :class="unitNumber == 3 ? 'main' : 'main-invert'"
        ></div>
      </div>
      <div
        :class="unitNumber == 4 ? 'main-invert' : 'main'"
        @click="clickMaterial"
      >
        <div
          class="icon-load svg-icon"
          :class="unitNumber == 4 ? 'main' : 'main-invert'"
        ></div>
      </div>
    </span>

    <div></div>
    <span>{{ unitNumber }}</span>

    <div v-for="(form, index) in unitInput" :key="index + 'unitInput'">
      <span v-if="form.type == 'input'">{{ form.label }} <input class="input"/></span>
    </div>

    <div class="button success">ADD UNIT</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    unitNumber: 0,
    unitInput: [
      { type: "input", label: "x" },
      { type: "input", label: "y" },
    ],
  }),

  methods: {
    clickLoad() {
      this.unitNumber = 0;
      this.unitInput = [
        { type: "input", label: "x" },
        { type: "input", label: "P" },
      ];
    },
    clickMoment() {
      this.unitNumber = 1;
      this.unitInput = [
        { type: "input", label: "x" },
        { type: "input", label: "M" },
      ];
    },
    clickDistload() {
      this.unitNumber = 2;
      this.unitInput = [
        { type: "input", label: "x1" },
        { type: "input", label: "P1" },
        { type: "input", label: "x2" },
        { type: "input", label: "P2" },
      ];
    },
    clickDefenition() {
      this.unitNumber = 3;
      this.unitInput = [{ type: "input", label: "x" }];
    },
    clickMaterial() {
      this.unitNumber = 4;
      this.unitInput = [
        { type: "input", label: "E" },
        { type: "input", label: "J" },
        { type: "input", label: "A" },
      ];
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../../../styles.scss"
@import "./form.style.scss"
</style>
