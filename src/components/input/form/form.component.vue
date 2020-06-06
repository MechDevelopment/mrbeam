<template>
  <div class="form">
    <!-- TOOLSET -->
    <span class="toolset">
      <div
        v-for="unit in UNIT_TYPES"
        :key="unit"
        :class="unit_type == unit ? 'main-invert' : 'main'"
        @click="unit_type = unit"
      >
        <span
          class="svg-icon"
          :class="
            unit_type == unit ? `main icon-${unit}` : `main-invert icon-${unit}`
          "
        ></span>
      </div>
    </span>

    <!-- LOAD -->
    <div class="inputs" v-show="unit_type == 'load'">
      <Textfield v-model="models.X" label="x"></Textfield>
      <Textfield v-model="models.P" label="P"></Textfield>
    </div>

    <!-- MOMENT -->
    <div class="inputs" v-show="unit_type == 'moment'">
      <Textfield v-model="models.X" label="x"></Textfield>
      <Textfield v-model="models.M" label="M"></Textfield>
    </div>

    <!-- DISTLOAD -->
    <div class="inputs" v-show="unit_type == 'distload'">
      <Textfield v-model="models.X" label="x<sub>0</sub>"></Textfield>
      <Textfield v-model="models.X1" label="x<sub>1</sub>"></Textfield>
      <Textfield v-model="models.Q0" label="q"></Textfield>
    </div>

    <!-- DEFENITION -->
    <div class="inputs" v-show="unit_type == 'defenition'">
      <span class="radio-buttons">
        <span class="svg-icon icon-defenition main-invert radio-icon"></span>

        <span class="svg-icon icon-fixed main-invert radio-icon"></span>

        <span class="svg-icon icon-hinge main-invert radio-icon"></span>
      </span>
      <Textfield v-model="models.X" label="x"></Textfield>
    </div>

    <!-- MATERIAL -->
    <div class="inputs" v-show="unit_type == 'material'">
      <Textfield v-model="models.X" label="x<sub>0</sub>"></Textfield>
      <Textfield v-model="models.X1" label="x<sub>1</sub>"></Textfield>
      <Textfield v-model="models.E" label="E"></Textfield>
      <Textfield v-model="models.J" label="J"></Textfield>
      <Textfield v-model="models.A" label="A"></Textfield>
    </div>

    <div class="button but-accent" @click="clickAdd">
      <span
        class="iconify"
        data-icon="carbon:add"
        data-inline="false"
        data-width="20"
        data-height="20"
      ></span>
      {{ "L_Add" | localize }}
    </div>
    <div class="button but-success">
      <span
        class="iconify"
        data-icon="clarity:calculator-line"
        data-inline="false"
        data-width="20"
        data-height="20"
      ></span>
      {{ "L_Calculate" | localize }}
    </div>
  </div>
</template>

<script>
import Textfield from "./textfield.component";

export default {
  data: () => ({
    UNIT_TYPES: ["load", "moment", "distload", "defenition", "material"],
    id: 0,
    unit_type: "load",
    models: { X: "", P: "", X1: "", Q0: "", M: "", D: 1, E: "", J: "", A: "" },
  }),

  methods: {
    clickAdd() {
      switch (this.unit_type) {
        case "load":
          this.$store.commit("addElement", {
            id: Date.now(),
            type: this.unit_type,
            x: [this.models.X],
            value: [this.models.P],
          });
          break;
        case "moment":
          this.$store.commit("addElement", {
            id: Date.now(),
            type: this.unit_type,
            x: [this.models.X],
            value: [this.models.M],
          });
          break;
        case "distload":
          this.models.Q1 = this.models.Q0;
          this.$store.commit("addElement", {
            id: Date.now(),
            type: this.unit_type,
            x: [this.models.X, this.models.X1],
            value: [this.models.Q0, this.models.Q1],
          });
          break;
        case "support":
          this.$store.commit("addElement", {
            id: Date.now(),
            type: this.unit_type,
            x: [this.models.X],
            value: [this.models.D],
          });
          break;
        case "material":
          this.$store.commit("addElement", {
            id: Date.now(),
            type: this.unit_type,
            x: [this.models.X, this.models.X1],
            value: [this.models.E, this.models.J, this.models.A],
          });
          break;
        default:
          break;
      }
    },
  },
  components: {
    Textfield,
  },
};
</script>

<style lang="sass" scoped>
@import "./form.style.scss"
</style>
