import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
	// data: () => ({
	//   chartdata: {
	//     labels: ['January', 'February'],
	//     datasets: [
	//       {
	//         label: 'Data One',
	//         backgroundColor: '#f87979',
	//         data: [40, 20]
	//       }
	//     ]
	//   },

	// }),

  mounted () {
    this.$watch('chartData', (newVal, oldVal) => {
      
      if (!oldVal) {
        this.renderChart(
          this.chartData,
          this.extraOptions
        )
      }
    }, { immediate: true })
  }
};
