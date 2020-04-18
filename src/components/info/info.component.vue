<template>
  <div class="container">
    INFO
    <button class="main" @click="changeTheme">CLICK</button>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe
      aliquam tempora ducimus doloremque ad omnis impedit dolorum voluptatum,
      consequuntur itaque, repellendus veniam qui! Distinctio dicta qui aperiam
      quidem voluptatum! Lorem, ipsum dolor sit amet consectetur adipisicing
      elit. Obcaecati perspiciatis, animi rem ad facilis voluptates illo
      temporibus sequi error accusantium, ullam vitae quas commodi delectus
      recusandae aliquam, doloremque voluptatem modi.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe
      aliquam tempora ducimus doloremque ad omnis impedit dolorum voluptatum,
      consequuntur itaque, repellendus veniam qui! Distinctio dicta qui aperiam
      quidem voluptatum! Lorem, ipsum dolor sit amet consectetur adipisicing
      elit. Obcaecati perspiciatis, animi rem ad facilis voluptates illo
      temporibus sequi error accusantium, ullam vitae quas commodi delectus
      recusandae aliquam, doloremque voluptatem modi.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe
      aliquam tempora ducimus doloremque ad omnis impedit dolorum voluptatum,
      consequuntur itaque, repellendus veniam qui! Distinctio dicta qui aperiam
      quidem voluptatum! Lorem, ipsum dolor sit amet consectetur adipisicing
      elit. Obcaecati perspiciatis, animi rem ad facilis voluptates illo
      temporibus sequi error accusantium, ullam vitae quas commodi delectus
      recusandae aliquam, doloremque voluptatem modi.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe
      aliquam tempora ducimus doloremque ad omnis impedit dolorum voluptatum,
      consequuntur itaque, repellendus veniam qui! Distinctio dicta qui aperiam
      quidem voluptatum! Lorem, ipsum dolor sit amet consectetur adipisicing
      elit. Obcaecati perspiciatis, animi rem ad facilis voluptates illo
      temporibus sequi error accusantium, ullam vitae quas commodi delectus
      recusandae aliquam, doloremque voluptatem modi.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe
      aliquam tempora ducimus doloremque ad omnis impedit dolorum voluptatum,
      consequuntur itaque, repellendus veniam qui! Distinctio dicta qui aperiam
      quidem voluptatum! Lorem, ipsum dolor sit amet consectetur adipisicing
      elit. Obcaecati perspiciatis, animi rem ad facilis voluptates illo
      temporibus sequi error accusantium, ullam vitae quas commodi delectus
      recusandae aliquam, doloremque voluptatem modi.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe
      aliquam tempora ducimus doloremque ad omnis impedit dolorum voluptatum,
      consequuntur itaque, repellendus veniam qui! Distinctio dicta qui aperiam
      quidem voluptatum! Lorem, ipsum dolor sit amet consectetur adipisicing
      elit. Obcaecati perspiciatis, animi rem ad facilis voluptates illo
      temporibus sequi error accusantium, ullam vitae quas commodi delectus
      recusandae aliquam, doloremque voluptatem modi.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe
      aliquam tempora ducimus doloremque ad omnis impedit dolorum voluptatum,
      consequuntur itaque, repellendus veniam qui! Distinctio dicta qui aperiam
      quidem voluptatum! Lorem, ipsum dolor sit amet consectetur adipisicing
      elit. Obcaecati perspiciatis, animi rem ad facilis voluptates illo
      temporibus sequi error accusantium, ullam vitae quas commodi delectus
      recusandae aliquam, doloremque voluptatem modi.
    </p>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    const html = document.querySelector("html");
    html.className = localStorage.theme || "light";
  },
  methods: {
    changeTheme() {
      const html = document.querySelector("html");
      html.className = html.className == "dark" ? "light" : "dark";
      localStorage.theme = html.className;
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../../styles.scss"
@import "./info.style.scss"
</style>
