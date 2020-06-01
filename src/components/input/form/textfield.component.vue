<template>
  <div>
    <span class="label" v-html="label"></span>
    <input
      v-bind:value="value"
      v-on="inputListeners"
      class="input"
      inputmode="numeric"
    />
  </div>
</template>

<script>
export default {
  props: ["label", "value"],
  computed: {
    inputListeners() {
      const input = (event) => this.$emit("input", event.target.value);
      return Object.assign({}, this.$listeners, { input });
    },
  },
};
</script>

<style lang="scss">
sub {
  font-size: 10pt;
}

.label {
  display: inline-block;
  margin: 3px;
  width: 25px;
  text-align: right;
  font-family: "Overlock", cursive;
  font-size: 16pt;
}
</style>
