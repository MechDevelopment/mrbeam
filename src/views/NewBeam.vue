<template>
  <!-- <section class="section">
    <div class="container debug">
      <div class="columns">
        <div class="column">First column</div>
        <div class="column">Second column</div>
        <div class="column">Third column</div>
        <div class="column">Fourth column</div>
      </div>
    </div>
  </section>-->
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-two-thirds">
          <b-table
            :data="isEmpty ? [] : data"
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

              <b-table-column field="first_name" label="Element">{{ props.row.first_name }}</b-table-column>

              <b-table-column field="last_name" label="X-coordinate">{{ props.row.last_name }}</b-table-column>

              <b-table-column field="load" label="Load" numeric>344</b-table-column>

              <b-table-column field="date" label="Date" centered>
                <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
              </b-table-column>

              <b-table-column label="Gender">
                <span>
                  <b-icon pack="fas" :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"></b-icon>
                  {{ props.row.gender }}
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
        </div>
        <div class="column">
          <form>
            <b-field>
              <b-select placeholder="Select a type">
                <option value="1">Bulma</option>
                <option value="2">Vue.js</option>
                <option value="3">Buefy</option>
              </b-select>
            </b-field>

            <b-field>
              <b-radio native-value="on-border">On Border</b-radio>
              <b-radio native-value="inside">Inside</b-radio>
            </b-field>

            <b-field>
              <b-input placeholder="X-coordinate" type="number"></b-input>
              <b-select placeholder="Meters">
                <option>Sm</option>
                <option>Mm</option>
              </b-select>
            </b-field>

            <b-field>
              <b-input placeholder="Load" type="number"></b-input>
              <b-select placeholder="N/m">
                <option>N/sm</option>
                <option>kN/m</option>
              </b-select>
            </b-field>

            <div class="buttons">
              <b-button
                class="button"
                type="is-primary submit"
                icon-pack="fas"
                icon-left="arrow-left"
              >Add Point</b-button>
              <b-button
                icon-pack="fas"
                icon-right="calculator"
                type="is-light"
                @click="test"
              >Calculate Beam</b-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import fem from "../services/FiniteElementMethod.js";

export default {
  data() {
    const data = [
      {
        id: 1,
        first_name: "Jesse",
        last_name: "Simmons",
        date: "2016/10/15 13:43:27",
        gender: "Male"
      },
      {
        id: 2,
        first_name: "John",
        last_name: "Jacobs",
        date: "2016/12/15 06:00:53",
        gender: "Male"
      },
      {
        id: 3,
        first_name: "Tina",
        last_name: "Gilbert",
        date: "2016/04/26 06:26:28",
        gender: "Female"
      },
      {
        id: 4,
        first_name: "Clarence",
        last_name: "Flores",
        date: "2016/04/10 10:28:46",
        gender: "Male"
      },
      {
        id: 5,
        first_name: "Anne",
        last_name: "Lee",
        date: "2016/12/06 14:38:38",
        gender: "Female"
      }
    ];

    return {
      data,
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
