<template>
  <section class="section has-background-white-ter">
    <div class="container">
      <div class="columns is-desktop">
        <!-- <div class="column is-two-thirds"> -->
        <div class="column">
          <!-- <div class="card">
            <img
              src="https://img05.rl0.ru/afisha/-x700/s5.afisha.net/MediaStorage/b7/8d/d78fe037939e47a9909975a18db7.jpg"
              alt
            />
          </div>-->
          <result-view />
          <result-view />
        </div>
        <div class="column">
          <add-point-form />
          <table-points />
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
