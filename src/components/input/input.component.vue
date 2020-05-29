<template>
  <div class="container">
    <Beam></Beam>
    <Form></Form>
    <Table></Table>
  </div>
</template>

<script>
import Form from "./form/form.component";
import Beam from "./beam/beam.component";
import Table from "./table/table.component";

export default {
  components: {
    Form,
    Beam,
    Table
  },
};
</script>

<style lang="sass" scoped>
@import "../../styles.scss"
@import "./input.style.scss"
</style>
