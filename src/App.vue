<template>
  <div id="app">
    <b-navbar>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">Home</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/newbeam' }">New Beam</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/newbeam2' }">New Beam2</b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary" href="/">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">Log in</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
    <footer class="footer">
      <div class="container-fluid">
        <span>© 2019, MechDevelopment</span>
        <div class="block">
          <a href="https://github.com/MechDevelopment">
            <b-icon icon="github-circle"></b-icon>
          </a>

          <b-icon icon="telegram"></b-icon>
          <b-icon icon="vk"></b-icon>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
