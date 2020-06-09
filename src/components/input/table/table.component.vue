<template>
  <div class="table-form">
    <div class="but-icons" v-show="elements.length">
      <div>
        <span
          class="iconify"
          data-icon="bx:bx-cloud-download"
          data-inline="false"
          data-width="25"
          data-height="25"
        ></span>
      </div>
      <div @click="clickClear">
        <span
          class="iconify"
          data-icon="ic:outline-delete"
          data-inline="false"
          data-width="25"
          data-height="25"
        ></span>
      </div>
    </div>
    
    <div v-for="element in elements" :key="element.id">
      <Card
        :card_id="element.id"
        :type="element.type"
        :x="element.x"
        :values="element.value"
      ></Card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Card from "./card/card.component";

export default {
  computed: {
    ...mapGetters(["elements"]),
  },

  methods: {
    clickClear() {
      this.$store.commit("clearElements");
    }
  },

  components: {
    Card,
  },
};
</script>

<style lang="sass" scoped>
@import "../../../styles.scss"
@import "./table.style.scss"
</style>
