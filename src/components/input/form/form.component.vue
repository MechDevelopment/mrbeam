<template>
  <div class="form">
    <span class="toolset">
      <div :class="unitNumber == 0 ? 'main-invert' : 'main'" @click="clickLoad">
        <span
          class="icon-load svg-icon"
          :class="unitNumber == 0 ? 'main' : 'main-invert'"
        ></span>
      </div>
      <div
        :class="unitNumber == 1 ? 'main-invert' : 'main'"
        @click="clickMoment"
      >
        <span
          class="svg-icon icon-moment"
          :class="unitNumber == 1 ? 'main' : 'main-invert'"
        ></span>
      </div>
      <div
        :class="unitNumber == 2 ? 'main-invert' : 'main'"
        @click="clickDistload"
      >
        <span
          class="svg-icon icon-distload"
          :class="unitNumber == 2 ? 'main' : 'main-invert'"
        ></span>
      </div>
      <div
        :class="unitNumber == 3 ? 'main-invert' : 'main'"
        @click="clickDefenition"
      >
        <span
          class="svg-icon icon-defenition"
          :class="unitNumber == 3 ? 'main' : 'main-invert'"
        ></span>
      </div>
      <div
        :class="unitNumber == 4 ? 'main-invert' : 'main'"
        @click="clickMaterial"
      >
        <span
          class="svg-icon icon-material"
          :class="unitNumber == 4 ? 'main' : 'main-invert'"
        ></span>
      </div>
    </span>

    <div></div>

    <div v-for="(form, index) in unitInput" :key="index + 'unitInput'">
      <span v-if="form.type == 'input'"
        >{{ form.label }} <input class="input"
      /></span>
    </div>

    <div class="button but-accent">
      <span
        class="iconify"
        data-icon="carbon:add"
        data-inline="false"
        data-width="20"
        data-height="20"
      ></span>
      {{ "L_Add" | localize }}
    </div>
    <div class="button but-success">
      <span
        class="iconify"
        data-icon="clarity:calculator-line"
        data-inline="false"
        data-width="20"
        data-height="20"
      ></span>
      {{ "L_Calculate" | localize }}
    </div>
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
        { type: "input", label: "x<sub>1</sub>" },
        { type: "input", label: "P<sub>1</sub>" },
        { type: "input", label: "x<sub>2</sub>" },
        { type: "input", label: "P<sub>2</sub>" },
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
