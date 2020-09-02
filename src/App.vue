<template>
  <div id="app">
    <div class="top-bar">
      <div class="top-bar-left">
        <ul class="dropdown menu" data-dropdown-menu>
          <li class="menu-text">Colonial Backdrop</li>
        </ul>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <Info></Info>
        </ul>
      </div>

    </div>
    <BackdropViz></BackdropViz>
  </div>

</template>

<script>
import Info from './components/Info.vue'
import BackdropViz from './components/BackdropViz.vue'

export default {
  name: 'App',
  components: {
    // Foundation,
    // FontAwesomeIcon,
    Info,
    BackdropViz
  }
}
</script>

<style>
#app {}
</style>
