<template>
  <div class="form">

    <!-- TOOLSET -->
    <span class="toolset">
      <div
        v-for="unit in UNIT_TYPES"
        :key="unit"
        :class="unit_type == unit ? 'main-invert' : 'main'"
        @click="unit_type = unit"
      >
        <span
          class="svg-icon"
          :class="
            unit_type == unit ? `main icon-${unit}` : `main-invert icon-${unit}`
          "
        ></span>
      </div>
    </span>

    <!-- INPUTS -->
    <div v-show="unit_type == 'load'">
      {{unit_type}}
    </div>

    <div v-show="unit_type == 'moment'">
      {{unit_type}}
    </div>

    <div v-show="unit_type == 'distload'">
      {{unit_type}}
    </div>

    <div v-show="unit_type == 'defenition'">
      {{unit_type}}
    </div>

    <div v-show="unit_type == 'material'">
      {{unit_type}}
    </div>

    <!-- <div v-for="(form, index) in unitInput" :key="index + 'unitInput'">
      <span v-if="form.type == 'input'"
        >{{ form.label }} <input class="input"
      /></span>
    </div> -->

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
    UNIT_TYPES: ["load", "moment", "distload", "defenition", "material"],
    unit_type: "load",
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
