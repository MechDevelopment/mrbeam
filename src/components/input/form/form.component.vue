<template>
  <div class="form">
    <span class="toolset">
      <button class="main" @click="clickLoad"><IconLoad></IconLoad></button>
      <button class="main" @click="clickMoment"><IconLoad></IconLoad></button>
      <button class="main" @click="clickDistload"><IconLoad></IconLoad></button>
      <button class="main" @click="clickDefenition"><IconLoad></IconLoad></button>
      <button class="main" @click="clickMaterial"><IconLoad></IconLoad></button>
    </span>

    <div></div>
    <span>{{ unitNumber }}</span>
    
    <div v-for="(form, index) in unitInput" :key="index + 'unitInput'">
      <span v-if="form.type == 'input'">{{form.label}} <input /></span>
    </div>

    <button>ADD UNIT</button>
  </div>
</template>

<script>
import IconLoad from "./icons/icon.load"

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
        { type: "input", label: "A" }
      ];
    },
  },

  components: {
    IconLoad
  }
};
</script>

<style lang="sass" scoped>
@import "../../../styles.scss"
@import "./form.style.scss"
</style>
