<template>
  <section class="section has-background-white-ter">
    <div class="container">
      <div class="columns">
        <!-- <div class="column is-two-thirds"> -->
        <div class="column">
          <result-view/>
        </div>
        <div class="column is-two-fifths">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">New Point</p>
              <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <add-point-form/>
            </div>
          </div>
          <div class="card has-table">
            <header class="card-header">
              <p class="card-header-title">List of Points</p>
              <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <table-points/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AddPointForm from "../components/AddPointForm.vue";
<<<<<<< HEAD
import FemService from "../services/TEST.js";
=======
import TablePoints from "../components/TablePoints.vue";
import ResultView from "../components/ResultView.vue";
>>>>>>> vuex

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
<<<<<<< HEAD
  methods: {
    test: function() {
      
      let femService = new FemService();
      console.log(femService)
      femService.import(this.$store.getters.getPoints);
    }
  }
=======
  methods: {}
>>>>>>> vuex
};
</script>
