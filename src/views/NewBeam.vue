<template>
  <section class="section has-background-white-ter">
    <div class="container">
      <div class="columns">
        <!-- <div class="column is-two-thirds"> -->
        <div class="column">
          <div class="card">
            <div class="card-content">
              <table-points/>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content">
              <add-point-form/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AddPointForm from "../components/AddPointForm.vue";
import TablePoints from "../components/TablePoints.vue";
// import fem from "../services/FiniteElementMethod.js";

export default {
  name: "NewBeam",
  components: {
    AddPointForm,
    TablePoints
  },
  data() {
    return {
      isEmpty: false,
      isBordered: false,
      isStriped: true,
      isNarrowed: true,
      isHoverable: true,
      isLoading: false
    };
  },
  computed: {
    points() {
      return this.$store.getters.getPoints;
    }
  },
  methods: {
    test: function() {
      fem();
    }
  }
};
</script>

<style>
.green {
  background-color: lightgreen;
}

.debug {
  border: 2px dashed salmon;
}
.debug1 {
  border: 1px dashed rebeccapurple;
}
</style>
