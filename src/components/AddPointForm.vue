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

    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>

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
      currentTab: "Load",
      tabs: ["Load", "DistLoad", "Momentum", "Defenition"],
      radioButton: "Yep"
    };
  },
  computed: {
    currentTabComponent() {
      return this.currentTab + "Form";
    }
  }
};
</script>
