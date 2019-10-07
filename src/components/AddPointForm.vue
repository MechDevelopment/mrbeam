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

    <b-field :type="{'is-danger': $v.$invalid}" message="Enter X offset">
      <b-input
        v-model.lazy="$v.xCoordinate.$model"
        placeholder="X-coordinate"
        type="number"
        expanded
      ></b-input>
      <!-- <p class="subtitle" v-if="!$v.xCoordinate.required">This field is required</p> -->
    </b-field>

    <b-field v-show="radioButton == 'distload'">
      <b-input placeholder="X2-coordinate" type="number" expanded></b-input>
      <b-select placeholder="Meters">
        <option>Sm</option>
        <option>Mm</option>
      </b-select>
    </b-field>

    <b-field v-show="radioButton == 'load'">
      <b-input v-model="angle" placeholder="Angle" type="number" expanded></b-input>
    </b-field>

    <b-field v-show="radioButton != 'defenition'">
      <b-input v-model="load" placeholder="Load" type="number" expanded></b-input>
      <b-select placeholder="N/m">
        <option>N/sm</option>
        <option>kN/m</option>
      </b-select>
    </b-field>

    <div class="buttons is-centered">
      <!-- <button type="submit" class="button is-primary">Submit</button> -->
      <b-button
        @click="addPoint"
        type="is-primary"
        icon-pack="fas"
        icon-left="arrow-left"
        :disabled="$v.$invalid"
      >Add Point</b-button>
      <b-button icon-pack="fas" icon-right="calculator" outlined @click="test">Analyse Beam</b-button>
    </div>
  </form>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
import FemService from "../services/TEST.js";

export default {
  data() {
    return {
      radioButton: "load",
      defenitionType: "1",
      // Form
      xCoordinate: null,
      angle: null,
      load: null
    };
  },
  computed: {
    ...mapGetters(["getPoints"])
  },
  methods: {
    addPoint() {
      const { radioButton, xCoordinate, angle, load } = this;
      const newPoint = {
        type: radioButton,
        x: xCoordinate,
        angle: angle,
        load: load
      };

      this.$store.commit("ADD_POINT", newPoint);
      console.log(this.getPoints);
    },
    test() {
      let femService = new FemService();
      femService.import(this.$store.getters.getPoints);
      let result = femService.getResult()
      console.log(result)
    }
  },
  validations: {
    xCoordinate: {
      required,
      minLength: minLength(1)
    }
  }
};
</script>
