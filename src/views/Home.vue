<template>
  <section class="hero is-landing is-fullheight has-background-white">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-1">
            <figure class="image is-4by4">
              <img
                class="lazy"
                src="../assets/hero-img.jpg"
                alt="Absurd image, Man with a bulb head - BulmaPlay made with Bulma CSS."
              />
            </figure>
          </div>

          <div class="column is-6 is-offset-1 landing-caption">
            <h1 class="title is-size-1 has-text-weight-bold">MrBEAM</h1>
            <p class="subtitle is-muted">Create and analyse complex beams</p>
            <b-button
              tag="router-link"
              to="/newbeam"
              class="primary-btn cta raised"
              rounded
            >New Analysis</b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "home"
};
</script>

<style>
.button.primary-btn {
  outline: none;
  border-color: #4fc1ea;
  background-color: #4fc1ea;
  color: #fff;
  transition: all 0.5s;
}

.button.cta {
  font-size: 1rem;
  font-weight: 600;
  padding: 26px 40px 26px 40px;
}

.button.primary-btn.raised:hover {
  box-shadow: 0 14px 26px -12px rgba(79, 193, 234, 0.42),
    0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(79, 193, 234, 0.2) !important;
  opacity: 0.8;
}

.subtitle.is-muted {
  color: #999;
}
</style>