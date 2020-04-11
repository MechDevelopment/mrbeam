<template>
  <div id="app">
    
    <button class="main" @click="changeTheme">CLICK</button>
    <Layout />
  </div>
</template>

<script>
import Layout from "./components/layout/layout.component";
export default {
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
