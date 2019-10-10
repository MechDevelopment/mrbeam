<template>
  <form>
    <!-- TAB BUTTONS -->
    <b-field position="is-centered">
      <b-radio-button v-model="radioButton" native-value="Load" type="is-primary">
        <b-icon pack="fas" icon="arrow-down"></b-icon>
        <span>Load</span>
      </b-radio-button>

      <b-radio-button v-model="radioButton" native-value="Distload" type="is-primary">
        <b-icon pack="fas" icon="angle-double-down"></b-icon>
        <span>Dist. Load</span>
      </b-radio-button>

      <b-radio-button v-model="radioButton" native-value="Momentum" type="is-primary">
        <b-icon pack="fas" icon="redo-alt"></b-icon>
        <span>Mom</span>
      </b-radio-button>

      <b-radio-button v-model="radioButton" native-value="Defenition" type="is-primary">
        <b-icon pack="fas" icon="align-center"></b-icon>
        <span>Def</span>
      </b-radio-button>
    </b-field>

    <b-field v-show="radioButton == 'Defenition'" position="is-centered">
      <b-radio v-model="defenitionType" native-value="1" type="is-danger">
        <span>Жесткое</span> <!-- [1, 1, 1]-->
      </b-radio>

      <b-radio v-model="defenitionType" native-value="2" type="is-success">
        <span>Нежесткое</span> <!-- [1, 1, 0]-->
      </b-radio>

<b-radio v-model="defenitionType" native-value="3" type="is-primary">
        <span>Мягкое</span> <!-- [0, 1, 0]-->
      </b-radio>
      
    </b-field>

    <!-- INPUTS -->

    <b-field
      :type="{'is-danger': $v.$anyError}"
      :message="{'Enter X offset': $v.$anyError}"
      v-show="radioButton !== 'Distload'"
      label="Position"
      horizontal
    >
      <b-input
        v-model="$v.xCoordinate.$model"
        v-show="radioButton !== 'Distload'"
        placeholder="X-coordinate"
        type="number"
      ></b-input>
      <b-select placeholder="Meters">
        <option>Sm</option>
        <option>Mm</option>
      </b-select>
      <!-- <p class="subtitle" v-if="!$v.xCoordinate.required">This field is required</p> -->
    </b-field>

    <b-field v-show="radioButton == 'Distload'" label="Start" horizontal>
      <b-input placeholder="Start position" type="number"></b-input>
      <b-select placeholder="Meters">
        <option>Sm</option>
        <option>Mm</option>
      </b-select>
    </b-field>

    <b-field v-show="radioButton == 'Distload'" label="End" horizontal>
      <b-input placeholder="End position" type="number"></b-input>
      <b-select placeholder="Meters">
        <option>Sm</option>
        <option>Mm</option>
      </b-select>
    </b-field>

    <b-field v-show="radioButton == 'Load'" label="Angle" horizontal>
      <b-input v-model="angle" placeholder="Angle" type="number"></b-input>
    </b-field>

    <b-field v-show="radioButton != 'Defenition'" label="Load" horizontal>
      <b-input v-model="load" placeholder="Load" type="number"></b-input>
      <b-select placeholder="N/m">
        <option>N/sm</option>
        <option>kN/m</option>
      </b-select>
    </b-field>

    <hr>

    <div class="buttons is-centered">
      <!-- <button type="submit" class="button is-primary">Submit</button> -->
      <b-button
        @click="addPoint"
        :disabled="isProcessing"
        type="is-primary"
        icon-pack="fas"
        icon-left="plus"
      >Add Point</b-button>
      <b-button
        @click="analyse"
        :disabled="isProcessing"
        type="is-primary"
        icon-pack="fas"
        icon-right="calculator"
        outlined
      >Analyse Beam</b-button>
    </div>
  </form>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
import BeamService from "../services/BeamService.js";

export default {
  data() {
    return {
      radioButton: "Load",
      defenitionType: "1",
      // Form
      xCoordinate: 0,
      x2Coordinate: null,
      angle: 90,
      load: 0
    };
  },
  computed: {
    ...mapGetters(["getPoints"]),
    isProcessing() {
      return this.$store.getters.getProcessing;
    }
  },
  methods: {
    addPoint() {
      const { radioButton, xCoordinate, load } = this;
      const newPoint = {
        type: radioButton,
        x: xCoordinate,
        // angle: angle,
        load: load
      };

      this.$store.commit("ADD_POINT", newPoint);
      console.log(this.getPoints);
    },
    analyse() {
      this.$store.commit("SET_PROCESSING", true);

      // setTimeout(() => {
      //   this.$store.commit("SET_PROCESSING", false);
      // }, 10 * 1000);
      let beamService = new BeamService();
      beamService.import(this.$store.getters.getPoints);
      let result = beamService.results;
      console.log('result:',  result)
      this.$store.commit("SET_RESULT", result);
      this.$store.commit("SET_PROCESSING", false);
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