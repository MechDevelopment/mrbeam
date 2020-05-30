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

    <!-- INPUTS -->
    <div class="inputs" v-show="unit_type == 'load'">
      <span class="input-wrapper">
        <span class="input-label">x</span>
        <input class="input" v-model="models.X" />
      </span>
      <span class="input-wrapper">
        <span class="input-label">P</span>
        <input class="input" v-model="models.P" />
      </span>
    </div>

    <div v-show="unit_type == 'moment'">
      {{ unit_type }}
    </div>

    <div v-show="unit_type == 'distload'">
      {{ unit_type }}
    </div>

    <div v-show="unit_type == 'defenition'">
      {{ unit_type }}
    </div>

    <div v-show="unit_type == 'material'">
      {{ unit_type }}
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
export default {
  data: () => ({
    UNIT_TYPES: ["load", "moment", "distload", "defenition", "material"],
    unit_type: "load",
    models: { X: "", P: "", X1: "", P1: "", M: "", D: "", E: "", J: "", A: "" },
  }),
  methods: {
    clickAdd() {
      switch (this.unit_type) {
        case "load":
          console.log(this.unit_type, this.models.X, this.models.P);
          break;
        case "moment":
          console.log(this.unit_type, this.models.X, this.models.M);
          break;
        case "distload":
          console.log(this.unit_type, this.models.X, this.models.P, this.models.X1, this.models.P1);
          break;
        case "defenition":
          console.log(this.unit_type, this.models.X, this.models.D);
          break;
        case "material":
          console.log(this.unit_type, this.models.E, this.models.J, this.models.A);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../../../styles.scss"
@import "./form.style.scss"
</style>
