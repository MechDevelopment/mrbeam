<template>
  <div class="container2">
    <!-- STATE BAR -->
    <div class="state-bar">
      <div class="state-icon main" @click="changeTheme">
        <span
          class="iconify"
          data-icon="mdi-invert-colors"
          data-width="20px"
          data-height="20px"
          data-inline="false"
        ></span>
      </div>

      <div class="state-icon main unselectable" @click="changeLocale">
        {{ "L_RU-EN" | localize }}
      </div>
    </div>
    
    <!-- TITLEPAGE -->
    <div class="titlepage unselectable">
      <p>
        {{ "L_title-up" | localize }}
      </p>
      <h1>Mr BEAM</h1>

      <p>{{ "L_title-down" | localize }}</p>

      <a class="button but-accent" href="#start">
        <span
          class="iconify"
          data-icon="ic:baseline-keyboard-arrow-down"
          data-inline="false"
        ></span>
        {{ "L_manual" | localize }}
        <span
          class="iconify"
          data-icon="ic:baseline-keyboard-arrow-down"
          data-inline="false"
        ></span>
      </a>
    </div>

    <!-- INFO BAR -->
    <div class="info-bar">
      <div class="anchor" id="start"></div>
      <p >{{ "L_Lorem" | localize }}</p>
      <p>{{ "L_Lorem" | localize }}</p>
      <p>{{ "L_Lorem" | localize }}</p>
      <p>{{ "L_Lorem" | localize }}</p>
      <p>{{ "L_Lorem" | localize }}</p>
      <p>{{ "L_Lorem" | localize }}</p>
      <p>{{ "L_Lorem" | localize }}</p>
      <p>{{ "L_Lorem" | localize }}</p>
    </div>
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
@import "./info.style.scss"
</style>
