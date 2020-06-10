<template>
  <div class="container">
    <p>
      {{ solution }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["solution", "elements"]),
  },
};
</script>

<style lang="sass" scoped>
@import "./data.style.scss"
</style>
