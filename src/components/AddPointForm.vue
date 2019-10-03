<template>
  <section>
    <div class="buttons">
      <b-button v-for="tab in tabs" v-bind:key="tab" v-on:click="currentTab = tab">{{ tab }}</b-button>
      <!-- <b-button class="button" type="is-primary submit" icon-pack="fas" icon-left="arrow-down">Load</b-button>
      <b-button
        class="button"
        type="is-primary submit"
        icon-pack="fas"
        icon-left="angle-double-down"
      >DistLoad</b-button>
      <b-button
        class="button"
        type="is-primary submit"
        icon-pack="fas"
        icon-left="align-center"
      >Definition</b-button>
      <b-button class="button" type="is-primary" icon-pack="fas" icon-left="blind">Momentum</b-button>-->
    </div>

    <!-- <load-form/>
    <dist-load-form/>-->
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
  </section>
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
      tabs: ["Load", "DistLoad", "Momentum", "Defenition"]
    };
  },
  computed: {
    currentTabComponent() {
      return this.currentTab + "Form";
    }
  }
};
</script>
