<template>
  <b-table
    :data="isEmpty ? [] : points"
    :bordered="isBordered"
    :striped="isStriped"
    :narrowed="isNarrowed"
    :hoverable="isHoverable"
    :loading="isLoading"
    :mobile-cards="false"
  >
    <template slot-scope="props">
      <b-table-column field="id" label="№" width="40" numeric>{{ props.row.id }}</b-table-column>

      <b-table-column field="type" label="Type" width="150">{{ props.row.type }}</b-table-column>

      <b-table-column field="x" label="X-coordinate" width="150" numeric>{{ props.row.x }}</b-table-column>

      <!-- <b-table-column field="angle" label="Angle" numeric>{{ props.row.angle }}</b-table-column> -->

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
</template>
<script>
export default {
  name: "TablePoint",
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
  }
};
</script>
