<template>
  <div class="table-form">
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
    <span>
      <div class="button but-success">
        <span
          class="iconify"
          data-icon="bx:bx-cloud-download"
          data-inline="false"
          data-width="20"
          data-height="20"
        ></span>
        {{"L_Download" | localize}}
      </div>
      <div class="button but-success">
        <span
          class="iconify"
          data-icon="ic:outline-delete"
          data-inline="false"
          data-width="20"
          data-height="20"
        ></span
        > {{"L_Clear" | localize}}
      </div>
    </span>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  mounted() {},
};
</script>

<style lang="sass" scoped>
@import "../../../styles.scss"
@import "./table.style.scss"
</style>
