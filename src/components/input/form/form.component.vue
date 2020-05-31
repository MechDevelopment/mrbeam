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
      <div>
        <div class="input-wrapper">
          <span class="input-label">x</span>
          <input class="input" v-model="models.X" inputmode="numeric" />
        </div>
        <div class="input-wrapper">
          <span class="input-label">P</span>
          <input class="input" v-model="models.P" inputmode="numeric" />
        </div>
      </div>
    </div>

    <!-- MOMENT -->
    <div class="inputs" v-show="unit_type == 'moment'">
      <div class="input-wrapper">
        <span class="input-label">x</span>
        <input class="input" v-model="models.X" inputmode="numeric" />
      </div>
      <div class="input-wrapper">
        <span class="input-label">M</span>
        <input class="input" v-model="models.M" inputmode="numeric" />
      </div>
    </div>

    <!-- DISTLOAD -->
    <div class="inputs" v-show="unit_type == 'distload'">
      <div class="input-wrapper">
        <span class="input-label">x<sub>0</sub></span>
        <input class="input" v-model="models.X" inputmode="numeric" />
      </div>
      <div class="input-wrapper">
        <span class="input-label">x<sub>1</sub></span>
        <input class="input" v-model="models.X1" inputmode="numeric" />
      </div>
      <div class="input-wrapper">
        <div v-show="true">
          <span class="input-label">q</span>
          <input class="input" v-model="models.Q0" inputmode="numeric" />
        </div>
        <div v-show="false">
          <span class="input-label">q<sub>0</sub></span>
          <input class="input" v-model="models.Q0" inputmode="numeric" />
          <span class="input-label">q<sub>1</sub></span>
          <input class="input" v-model="models.Q1" inputmode="numeric" />
        </div>
      </div>
    </div>

    <!-- DEFENITION -->
    <div class="inputs" v-show="unit_type == 'defenition'">
      <span class="radio-buttons">
        <span class="svg-icon icon-defenition main-invert radio-icon"></span>

        <span class="svg-icon icon-fixed main-invert radio-icon"></span>

        <span class="svg-icon icon-hinge main-invert radio-icon"></span>
      </span>
      <div class="input-wrapper">
        <span class="input-label">x</span>
        <input class="input" v-model="models.X" inputmode="numeric" />
      </div>
    </div>

    <!-- MATERIAL -->
    <div class="inputs" v-show="unit_type == 'material'">
      <div class="input-wrapper">
        <span class="input-label">E</span>
        <input class="input" v-model="models.E" inputmode="numeric" />
      </div>
      <div class="input-wrapper">
        <span class="input-label">J</span>
        <input class="input" v-model="models.J" inputmode="numeric" />
      </div>
      <div class="input-wrapper">
        <span class="input-label">A</span>
        <input class="input" v-model="models.A" inputmode="numeric" />
      </div>
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
    models: { X: "", P: "", X1: "", Q0: "", M: "", D: "", E: "", J: "", A: "" },
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
          console.log(
            this.unit_type,
            this.models.X,
            this.models.P,
            this.models.X1,
            this.models.P1
          );
          break;
        case "defenition":
          console.log(this.unit_type, this.models.X, this.models.D);
          break;
        case "material":
          console.log(
            this.unit_type,
            this.models.E,
            this.models.J,
            this.models.A
          );
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
