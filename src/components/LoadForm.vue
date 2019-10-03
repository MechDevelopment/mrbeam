<template>
  <form>
    <b-field>
      <b-select placeholder="Select a type">
        <option value="1">Bulma</option>
        <option value="2">Vue.js</option>
        <option value="3">Buefy</option>
      </b-select>
    </b-field>

    <b-field>
      <b-radio native-value="on-border">On Border</b-radio>
      <b-radio native-value="inside">Inside</b-radio>
    </b-field>

    <b-field>
      <b-input placeholder="X-coordinate" type="number"></b-input>
      <b-select placeholder="Meters">
        <option>Sm</option>
        <option>Mm</option>
      </b-select>
    </b-field>

    <b-field>
      <b-input placeholder="Load" type="number"></b-input>
      <b-select placeholder="N/m">
        <option>N/sm</option>
        <option>kN/m</option>
      </b-select>
    </b-field>
  </form>
</template>

<script>
export default {
  name: "LoadForm"
};
</script>
