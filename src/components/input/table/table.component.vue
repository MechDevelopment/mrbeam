<template>
  <div class="table-form">
    <div v-for="element in elements" :key="element.id">
      <Card
        :card_id="element.id"
        :type="element.type"
        :values="element.value"
      ></Card>
    </div>

    <span v-show="elements.length">
      <div class="button but-success">
        <span
          class="iconify"
          data-icon="bx:bx-cloud-download"
          data-inline="false"
          data-width="20"
          data-height="20"
        ></span>
        {{ "L_Download" | localize }}
      </div>
      <div class="button but-success" @click="clickClear">
        <span
          class="iconify"
          data-icon="ic:outline-delete"
          data-inline="false"
          data-width="20"
          data-height="20"
        ></span>
        {{ "L_Clear" | localize }}
      </div>
    </span>
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
