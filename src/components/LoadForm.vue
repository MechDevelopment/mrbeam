<template>
  <form>
    <b-field label="X-coordinate" :label-position="labelPosition">
      <b-input type="number"></b-input>
      <b-select placeholder="Meters">
        <option>Sm</option>
        <option>Mm</option>
      </b-select>
    </b-field>

    <b-field label="Angle" :label-position="labelPosition">
      <b-input type="number"></b-input>
    </b-field>

    <b-field label="Load" :label-position="labelPosition">
      <b-input type="number"></b-input>
      <b-select placeholder="N/m">
        <option>N/sm</option>
        <option>kN/m</option>
      </b-select>
    </b-field>
  </form>
</template>

<script>
export default {
  name: "LoadForm",
  data() {
    return {
      labelPosition: "on-border"
    };
  }
};
</script>
