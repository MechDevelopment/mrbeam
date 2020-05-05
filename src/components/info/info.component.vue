<template>
  <div class="container">
    <span class="btn main" @click="changeTheme">
      <span
        class="iconify"
        data-icon="mdi-invert-colors"
        data-width="20px"
        data-height="20px"
        data-inline="false"
      ></span>
    </span>

    <span class="btn main" @click="changeLocale">
      {{ "L_RU-EN" | localize }}
    </span>

    <div class="titlepage">
      <p>
        Online beam calculator
      </p>
      <h1>Mr BEAM</h1>
      <p>Create and analize complex beam</p>

      <div class="button primary" href="#start">Manual</div>
    </div>

    <p id="start">{{"L_Lorem" | localize}}</p>
    <p>{{"L_Lorem" | localize}}</p>
    <p>{{"L_Lorem" | localize}}</p>
    <p>{{"L_Lorem" | localize}}</p>
    <p>{{"L_Lorem" | localize}}</p>
    <p>{{"L_Lorem" | localize}}</p>
    <p>{{"L_Lorem" | localize}}</p>
    <p>{{"L_Lorem" | localize}}</p>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    const html = document.querySelector("html");
    html.className = localStorage.theme || "light";

    this.$store.commit("setLocale", localStorage.locale || "ru-RU");
  },
  methods: {
    changeTheme() {
      const html = document.querySelector("html");
      html.className = html.className == "dark" ? "light" : "dark";
      localStorage.theme = html.className;
    },
    changeLocale() {
      if (this.$store.getters.locale == "ru-RU") {
        this.$store.commit("setLocale", "en-US");
        localStorage.locale = "en-US";
      } else {
        this.$store.commit("setLocale", "ru-RU");
        localStorage.locale = "ru-RU";
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../../styles.scss"
@import "./info.style.scss"
</style>
