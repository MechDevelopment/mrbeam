<template>
  <div>
    <span class="label" v-html="label"></span>
    <input
      v-bind:value="value"
      v-on="inputListeners"
      v-on:focus="onFocus"
      v-on:blur="onBlur"
      v-on:keyup.enter="onKeyEnter"
      class="input"
      inputmode="numeric"
    />
  </div>
</template>

<script>
export default {
  props: ["label", "value"],

  data: () => ({
    remember: undefined,
  }),

  computed: {
    inputListeners() {
      const input = (event) => this.$emit("input", event.target.value);
      return Object.assign({}, this.$listeners, { input });
    },
  },

  methods: {
    onFocus() {
      this.remember = this.value; // Remember last value
      this.$emit("input", ""); // Clear input
    },

    onBlur() {
      if (this.value == "") {
        this.$emit("input", this.remember); // restore value
        return;
      }

      // Evaluate string value
      try {
        this.$emit("input", eval(this.value.replace("^", "**")));
      } catch (error) {
        this.$emit("input", "Not a number!");
      }
    },

    onKeyEnter() {
      // blur input
      this.$el.getElementsByClassName("input")[0].blur();
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
  margin-left: -28px;
  width: 25px;
  text-align: right;
  font-family: "Overlock", cursive;
  font-size: 16pt;
}
</style>
