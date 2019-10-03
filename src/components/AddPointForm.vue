<template>
  <form>
    <b-field>
      <b-radio-button v-model="radioButton" native-value="load" type="is-danger">
        <b-icon icon="close"></b-icon>
        <span>Load</span>
      </b-radio-button>

      <b-radio-button v-model="radioButton" native-value="defload" type="is-success">
        <b-icon icon="check"></b-icon>
        <span>Def. Load</span>
      </b-radio-button>

      <b-radio-button v-model="radioButton" native-value="momentum">Mom</b-radio-button>

      <b-radio-button v-model="radioButton" native-value="defenition">Defenition</b-radio-button>
    </b-field>

    <b-field v-show="radioButton == 'defenition'">
      <b-radio-button v-model="defenitionType" native-value="1" type="is-danger">
        <b-icon icon="close"></b-icon>
        <span>Load</span>
      </b-radio-button>

      <b-radio-button v-model="defenitionType" native-value="2" type="is-success">
        <b-icon icon="check"></b-icon>
        <span>Def. Load</span>
      </b-radio-button>
    </b-field>

    <b-field>
      <b-input placeholder="X-coordinate" type="number"></b-input>
      <b-select placeholder="Meters">
        <option>Sm</option>
        <option>Mm</option>
      </b-select>
    </b-field>

    <b-field v-show="radioButton == 'defload'">
      <b-input placeholder="Y-coordinate" type="number"></b-input>
      <b-select placeholder="Meters">
        <option>Sm</option>
        <option>Mm</option>
      </b-select>
    </b-field>

    <b-field v-show="radioButton == 'load'">
      <b-input placeholder="Angle" type="number"></b-input>
    </b-field>

    <b-field v-show="radioButton != 'defenition'">
      <b-input placeholder="Load" type="number"></b-input>
      <b-select placeholder="N/m">
        <option>N/sm</option>
        <option>kN/m</option>
      </b-select>
    </b-field>

    <div class="buttons">
      <b-button
        class="button"
        type="is-primary submit"
        icon-pack="fas"
        icon-left="arrow-left"
      >Add Point</b-button>
      <b-button icon-pack="fas" icon-right="calculator" type="is-light">Analyse Beam</b-button>
    </div>
  </form>
</template>

<script>
import LoadForm from "./LoadForm.vue";
import DistLoadForm from "./DistLoadForm.vue";

export default {
  components: {
    LoadForm,
    DistLoadForm
  },
  data() {
    return {
      radioButton: "load",
      defenitionType: "1"
    };
  }
};
</script>
