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

    <!-- INPUTES -->
    <div>
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
          <div
            v-for="def in DEF_TYPES"
            :key="def"
            :class="def_type == def ? 'main-invert' : 'main'"
            @click="def_type = def"
          >
            <span
              class="svg-icon radio-icon"
              :class="
                def_type == def ? `main icon-${def}` : `main-invert icon-${def}`
              "
            ></span>
          </div>
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
    </div>

    <!-- BUTTON -->
    <div class="button but-accent" @click="clickAdd">
      <span
        class="iconify"
        data-icon="carbon:add"
        data-inline="false"
        data-width="20"
        data-height="20"
      ></span>
      {{ "L_Add" | localize }}
      <span
        class="iconify"
        data-icon="carbon:add"
        data-inline="false"
        data-width="20"
        data-height="20"
      ></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Textfield from "./textfield.component";

export default {
  computed: {
    ...mapGetters(["elements"]),
  },

  data: () => ({
    UNIT_TYPES: ["load", "moment", "distload", "defenition", "material"],
    id: 0,
    unit_type: "load",
    models: {
      X: "0",
      P: "0",
      X1: "0",
      Q0: "0",
      M: "0",
      E: "1",
      J: "1",
      A: "1",
    },
    DEF_TYPES: ["defenition", "fixed", "hinge"],
    def_type: "defenition",
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
        case "defenition":
          let D = 1;
          if (this.def_type == "defenition") D = 3;
          else if (this.def_type == "hinge") D = 4;
          this.$store.commit("addElement", {
            id: Date.now(),
            type: this.unit_type,
            x: [this.models.X],
            value: [D],
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

    clickCalculate() {
      const URL = "https://mrbeam2.herokuapp.com/calculate";
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },

        body: JSON.stringify(this.elements),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.$store.commit("setSolution", data);
        });
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
