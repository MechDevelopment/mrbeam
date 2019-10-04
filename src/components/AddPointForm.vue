<template>
  <form>
    <!-- TAB BUTTONS -->
    <b-field position="is-centered">
      <b-radio-button v-model="radioButton" native-value="load" type="is-danger">
        <b-icon pack="fas" icon="arrow-down"></b-icon>
        <span>Load</span>
      </b-radio-button>

      <b-radio-button v-model="radioButton" native-value="distload" type="is-success">
        <b-icon pack="fas" icon="angle-double-down"></b-icon>
        <span>Dist. Load</span>
      </b-radio-button>

      <b-radio-button v-model="radioButton" native-value="momentum">
        <b-icon pack="fas" icon="blind"></b-icon>
        <span>Mom</span>
      </b-radio-button>

      <b-radio-button v-model="radioButton" native-value="defenition">
        <b-icon pack="fas" icon="align-center"></b-icon>
        <span>Def</span>
      </b-radio-button>
    </b-field>

    <b-field v-show="radioButton == 'defenition'" position="is-centered">
      <b-radio v-model="defenitionType" native-value="1" type="is-danger">
        <span>Load</span>
      </b-radio>

      <b-radio v-model="defenitionType" native-value="2" type="is-success">
        <span>Def. Load</span>
      </b-radio>
    </b-field>

    <b-field>
      <b-input placeholder="X-coordinate" type="number" expanded></b-input>
      <b-select placeholder="Meters">
        <option>Sm</option>
        <option>Mm</option>
      </b-select>
    </b-field>

    <b-field v-show="radioButton == 'distload'">
      <b-input placeholder="Y-coordinate" type="number" expanded></b-input>
      <b-select placeholder="Meters">
        <option>Sm</option>
        <option>Mm</option>
      </b-select>
    </b-field>

    <b-field v-show="radioButton == 'load'">
      <b-input placeholder="Angle" type="number" expanded></b-input>
    </b-field>

    <b-field v-show="radioButton != 'defenition'">
      <b-input placeholder="Load" type="number" expanded></b-input>
      <b-select placeholder="N/m">
        <option>N/sm</option>
        <option>kN/m</option>
      </b-select>
    </b-field>

    <div class="buttons is-centered">
      <!-- <button type="submit" class="button is-primary">Submit</button> -->
      <b-button type="is-primary" icon-pack="fas" icon-left="arrow-left">Add Point</b-button>
      <b-button icon-pack="fas" icon-right="calculator" outlined>Analyse Beam</b-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      radioButton: "load",
      defenitionType: "1"
    };
  }
};
</script>
