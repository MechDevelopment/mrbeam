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
    ...mapGetters(["solution"]),
  },
};
</script>

<style lang="sass" scoped>
@import "./chart.style.scss"
</style>
