<template>
  <div>
    INFO
    <button class="main" @click="changeTheme">CLICK</button>
  </div>
</template>

<script>
export default {
  methods: {
    changeTheme() {
      const html = document.querySelector("html");
      html.className = html.className == "dark" ? "light" : "dark";
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../../styles.scss"
@import "./info.style.scss"
</style>
