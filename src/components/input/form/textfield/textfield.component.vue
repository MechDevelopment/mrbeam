<template>
  <div class="input-wrapper">
    <span class="input-label">{{label}}</span>
    <input class="input" v-model="model" inputmode="numeric" />
  </div>
</template>

<script>
export default {
  props: ["model", "label"],
  methods: {},
};
</script>

<style lang="sass" scoped>
@import "./textfield.style.scss"
</style>
