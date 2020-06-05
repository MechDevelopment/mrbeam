<template>
  <div id="app">
    <Layout item-class="main" item-max-width="800">
      <Info />
      <Input />
      <Chart />
      <Data />
    </Layout>
  </div>
</template>

<script>
import Layout from "./components/layout/layout.component";
import Info from "./components/info/info.component";
import Input from "./components/input/input.component";
import Chart from "./components/chart/chart.component";
import Data from "./components/data/data.component";


export default {
  components: {
    Layout,
    Info,
    Input,
    Chart,
    Data,
  },
};
</script>

<style lang="sass">
@import "./styles"
</style>
