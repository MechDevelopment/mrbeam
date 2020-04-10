<template>
  <div id="app">
    <Layout />
    <button class="main" @click="changeTheme">CLICK</button>
  </div>
</template>

<script>
import Layout from "./components/layout/layout.component";
export default {
  data: () => ({
    theme: true
  }),

  methods: {
    changeTheme() {
      const html = document.querySelector("html");
      html.className = html.className == "dark" ? "light" : "dark";
    }
  },

  components: {
    Layout
  }
};
</script>

<style lang="sass">
@import "./styles"
</style>
