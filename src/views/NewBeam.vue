<template>
  <section class="section has-background-white-ter">
    <div class="container">
      <div class="columns">
        <!-- <div class="column is-two-thirds"> -->
        <div class="column">
          <div class="card">
            <div class="card-content">
              <form>
                <b-field label="From" horizontal>
                  <b-field>
                    <b-input icon="account" placeholder="Name" required/>
                  </b-field>
                  <b-field>
                    <b-input icon="email" type="email" placeholder="E-mail" required/>
                  </b-field>
                </b-field>
                <b-field message="Do not enter the leading zero" horizontal>
                  <b-field>
                    <p class="control">
                      <a class="button is-static">+44</a>
                    </p>
                    <b-input type="tel" expanded/>
                  </b-field>
                </b-field>
              </form>

              <!-- LOADER -->
              <b-loading :is-full-page="isFullPage" :active.sync="isProcessing" :can-cancel="true">
                <b-icon pack="fas" icon="cog" size="is-large" custom-class="fa-spin"></b-icon>
                <span>
                  <strong>Calculating..</strong>
                </span>
              </b-loading>
            </div>
          </div>
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
import TablePoints from "../components/TablePoints.vue";

export default {
  name: "NewBeam",
  components: {
    AddPointForm,
    TablePoints
  },
  data() {
    return {
      isFullPage: false
    };
  },
  computed: {
    isProcessing() {
      return this.$store.getters.getProcessing;
    },
    points() {
      return this.$store.getters.getPoints;
    }
  },
  methods: {}
};
</script>
