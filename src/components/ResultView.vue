<template>
  <div class="card">
    <div class="card-content">
      {{chartData}}
      <line-chart :chart-data="datacollection"/>
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
import LineChart from '@/components/Charts/LineChart'

export default {
  name: "ResultView",
  components: {
    LineChart
  },
  data() {
    return {
      isFullPage: false,
      chartdata: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    }
    };
  },
  computed: {
    isProcessing() {
      return this.$store.getters.getProcessing;
    },
    datacollection() {
      const result = this.$store.getters.getResult;
      return {
              labels: result[0],
              // labels: ["0","0.3","0.3","0.6","0.6","0.9","0.9","1.2","1.2","1.5","1.5","1.8","1.8","2.1","2.1","2.4","2.4","2.7","2.7","3","3","3.4","3.4","3.8","3.8","4.2","4.2","4.6","4.6","5","5","5.4","5.4","5.8","5.8","6.2","6.2","6.6","6.6","7","7","7.3","7.3","7.6","7.6","7.9","7.9","8.2","8.2","8.5","8.5","8.8","8.8","9.1","9.1","9.4","9.4","9.7","9.7","10"],
              datasets: [
                {
                  label: 'Shear',
                  backgroundColor: '#f87979',
                  // data: [-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-315,-315,-315,-315,-315,-315,-315,-315,-315,-315,-315,-315,-315,-315,-315,-315,-315,-315,-315,-315,685,685,685,685,685,685,685,685,685,685,685,685,685,685,685,685,685,685,685,685]
                  data: result[1]
                }
              ]
            }
    }
  }
};
</script>
