<template>
  <div class="main" :class="theme ? 'light' : 'dark'" id="app">
    <Layout />
    <button @click="theme = !theme">CLICK</button>
  </div>
</template>

<script>
import Layout from "./components/layout/layout.component";
export default {
  data: () => ({
    theme: true
  }),

  components: {
    Layout
  }
};
</script>

<style lang="sass">
@import "./styles"
</style>
