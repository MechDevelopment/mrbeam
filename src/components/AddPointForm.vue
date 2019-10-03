<template>
  <section>
    <div class="buttons">
      <b-button
        v-for="tab in tabs"
        :key="tab"
        @click="currentTab = tab"
        icon-pack="fas"
        :icon-left="tab.icon"
        class="is-light"
      >{{ tab.name }}</b-button>
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
      <b-button type="is-primary" icon-pack="fas" icon-left="arrow-left">Add Point</b-button>
      <b-button type="is-light" icon-pack="fas" icon-right="calculator">Analyse Beam</b-button>
    </div>
  </section>
</template>

<script>
import LoadForm from "./LoadForm.vue";
import DistLoadForm from "./DistLoadForm.vue";
import MomentumForm from "./MomentumForm.vue";
import DefenitionForm from "./DefenitionForm.vue";

export default {
  components: {
    LoadForm,
    DistLoadForm,
    MomentumForm,
    DefenitionForm
  },
  data() {
    return {
      currentTab: "Load",
      // tabs: ["Load", "DistLoad", "Momentum", "Defenition"],
      tabs: [
        { name: "Load", icon: "arrow-down" },
        { name: "DistLoad", icon: "angle-double-down" },
        { name: "Momentum", icon: "blind" },
        { name: "Defenition", icon: "align-center" }
      ]
    };
  },
  computed: {
    currentTabComponent() {
      return this.currentTab.name + "Form";
    }
  }
};
</script>
