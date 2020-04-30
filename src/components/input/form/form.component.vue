<template>
  <div class="form">
    <span class="toolset">
      <button class="main" @click="clickLoad">Load</button>
      <button class="main" @click="clickMoment">Moment</button>
      <button class="main" @click="clickDistload">Dist</button>
      <button class="main" @click="clickDefenition">Def</button>
      <button class="main" @click="clickMaterial">Mat</button>
    </span>
    <div></div>

    <div></div>
    <span>{{ unitNumber }}</span>
  </div>
</template>

<script>
export default {
  data: () => ({
    unitNumber: 0,
  }),

  methods: {
    clickLoad() {
      this.unitNumber = 0
    },
    clickMoment() {
      this.unitNumber = 1
    },
    clickDistload() {
      this.unitNumber = 2
    },
    clickDefenition() {
      this.unitNumber = 3
    },
    clickMaterial() {
      this.unitNumber = 4
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../../../styles.scss"
@import "./form.style.scss"
</style>
