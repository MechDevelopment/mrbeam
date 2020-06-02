<template>
  <div class="card">
    <span class="card-icon main-invert" :class="`icon-${type}`"></span>
    <span class="card-values math">{{ cardValues(values) }}</span>
    <div class="card-delete" @click="clickDelete">
      <span
        class="iconify"
        data-icon="eva:close-circle-fill"
        data-inline="false"
        data-width="25"
        data-height="25"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["card_id", "type", "values"],
  methods: {
    cardValues(v){
      switch (this.type) {
        case "load":
          return `x: ${v.X}     P: ${v.P}`;
          break;
        case "moment":
          return `x: ${v.X}     M: ${v.M}`;
          break;
        case "distload":
          return `x: ${v.X}     x: ${v.X0}     q: ${v.Q}`;
          break;
        case "defenition":
          return `x: ${v.X}`;
          break;
        case "material":
          return `E: ${v.E}     J: ${v.J}     A: ${v.A}`;
          break;
        default:
          return ""
          break;
      }
    },
    clickDelete() {
      this.$store.commit("deleteElementById", this.card_id);
    },
  },
};
</script>

<style lang="sass" scoped>
@import "./card.style.scss"
</style>
