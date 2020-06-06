<template>
  <div class="card">
    <span class="card-icon main-invert" :class="`icon-${type}`"></span>
    <span class="card-values math">{{ cardValues(x, values) }}</span>
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
  props: ["card_id", "type", "x", "values"],
  methods: {
    cardValues(x, v){
      switch (this.type) {
        case "load":
          return `x: ${x[0]}     P: ${v[0]}`;
          break;
        case "moment":
          return `x: ${x[0]}     M: ${v[0]}`;
          break;
        case "distload":
          return `x: ${x[0]}     x: ${x[1]}     q: ${v[0]}`;
          break;
        case "defenition":
          return `x: ${x[0]}`;
          break;
        case "material":
          return `x: ${x[0]}     x: ${x[1]}      E: ${v[0]}     J: ${v[1]}     A: ${v[2]}`;
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
