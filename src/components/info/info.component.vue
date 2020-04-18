<template>
  <div class="container">
    INFO
    <button class="main" @click="changeTheme">
      {{ "L_Theme" | localize }}
    </button>
    <button class="main" @click="changeLocale">
      {{ "L_Language" | localize }}
    </button>
    <p>
      {{ "L_Lorem" | localize }}
    </p>
    <p>
      {{ "L_Lorem" | localize }}
    </p>
    <p>
      {{ "L_Lorem" | localize }}
    </p>
    <p>
      {{ "L_Lorem" | localize }}
    </p>
    <p>
      {{ "L_Lorem" | localize }}
    </p>
    <p>
      {{ "L_Lorem" | localize }}
    </p>
    <p>
      {{ "L_Lorem" | localize }}
    </p>
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
