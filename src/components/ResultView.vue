<template>
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
</template>

<script>
export default {
  name: "ResultView",
  data() {
    return {
      isFullPage: false
    };
  },
  computed: {
    isProcessing() {
      return this.$store.getters.getProcessing;
    }
  }
};
</script>
