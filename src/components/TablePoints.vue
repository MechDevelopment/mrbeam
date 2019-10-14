<template>
  <b-table
    :data="isEmpty ? [] : points"
    :bordered="isBordered"
    :striped="isStriped"
    :narrowed="isNarrowed"
    :hoverable="isHoverable"
    :loading="isLoading"
    :default-sort-direction="defaultSortDirection"
    :sort-icon="sortIcon"
    :mobile-cards="false"
  >
    <template slot-scope="props">
      <b-table-column field="id" label="№" width="40" numeric>{{ props.row.id }}</b-table-column>

      <b-table-column field="type" label="Type">{{ props.row.type }}</b-table-column>

      <b-table-column field="x" label="Coordinate" numeric centered>{{ props.row.x }}</b-table-column>

      <!-- <b-table-column field="angle" label="Angle" numeric>{{ props.row.angle }}</b-table-column> -->

      <b-table-column field="load" label="Load" numeric centered>{{ props.row.load }}</b-table-column>

      <!-- TODO: Align delete icon in the row -->
      <b-table-column @click="deletePoint">
        <span @click="deletePoint(props.row.id)">
          <b-icon pack="fas" icon="times" class="is-small"></b-icon>
        </span>
      </b-table-column>
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
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "TablePoint",
  data() {
    return {
      isEmpty: false,
      isBordered: false,
      isStriped: true,
      isNarrowed: true,
      isHoverable: true,
      isLoading: false,
      defaultSortDirection: "asc",
      sortIcon: "arrow-up"
    };
  },
  computed: {
    points() {
      return this.$store.getters.getPoints;
    }
  },
  methods: {
    ...mapActions(["calculate"]),
    deletePoint(id) {
      console.log(this.points.filter(point => point.id !== id));
      this.$store.commit("DELETE_POINT", id);
      // console.log(this.points.filter(point => point.id !== id));
    }
  }
};
</script>
