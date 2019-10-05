<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-two-thirds">
          <b-table
            :data="isEmpty ? [] : points"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :hoverable="isHoverable"
            :loading="isLoading"
            :focusable="isFocusable"
            :mobile-cards="false"
          >
            <template slot-scope="props">
              <b-table-column field="id" label="№" width="40" numeric>{{ props.row.id }}</b-table-column>

              <b-table-column field="type" label="Type" width="60">{{ props.row.type }}</b-table-column>

              <b-table-column field="x" label="X-coordinate" numeric>{{ props.row.x }}</b-table-column>

              <b-table-column field="angle" label="Angle" numeric>{{ props.row.angle }}</b-table-column>

              <b-table-column field="load" label="Load" numeric>{{ props.row.load }}</b-table-column>
            </template>
            <template slot="empty">
              <section class="section">
                <div class="content has-text-grey has-text-centered">
                  <p>
                    <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                  </p>
                  <p>Nothing here.</p>
                </div>
              </section>
            </template>
          </b-table>
        </div>
        <div class="column">
          <add-point-form/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AddPointForm from "../components/AddPointForm.vue";
// import fem from "../services/FiniteElementMethod.js";

export default {
  name: "NewBeam",
  components: {
    AddPointForm
  },
  data() {
    return {
      isEmpty: false,
      isBordered: false,
      isStriped: true,
      isNarrowed: false,
      isHoverable: true,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true
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
