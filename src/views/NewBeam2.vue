<template>
  <section class="section has-background-white-ter">
    <div class="container">
      <div class="column">
        <result-view />
      </div>
      <div class="column">
        <div class="columns">
          <div class="column">
            <add-point-form />
          </div>
          <div class="column">
            <table-points />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AddPointForm from "../components/AddPointForm.vue";
import TablePoints from "../components/TablePoints.vue";
import ResultView from "../components/ResultView.vue";

export default {
  name: "NewBeam",
  components: {
    AddPointForm,
    TablePoints,
    ResultView
  },
  data() {
    return {
      isFullPage: false
    };
  },
  computed: {
    points() {
      return this.$store.getters.getPoints;
    }
  },
  methods: {}
};
</script>