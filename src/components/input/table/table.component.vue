<template>
  <div class="table-form">
    
    <Card card_id="1" type="load" :values="{X: 12, P: 32}" ></Card>
    <Card card_id="2" type="moment" :values="{X: 12, M: 32}"></Card>
    <Card card_id="3" type="distload" :values="{X: 121, X0: 312, Q: 102}"></Card>
    <Card card_id="4" type="defenition" :values="{X: 12}"></Card>
    <Card card_id="5" type="material" :values="{E: 12343242, J: 32324324, A: 4343}"></Card>

    <span>
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
      <div class="button but-success">
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
import Card from "./card/card.component";

export default {
  data: () => ({
    load_value: {X: 12, P: 32}
  }),
  mounted() {},
  components: {
    Card,
  },
};
</script>

<style lang="sass" scoped>
@import "../../../styles.scss"
@import "./table.style.scss"
</style>
