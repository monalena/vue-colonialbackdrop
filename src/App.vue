<template>
  <div id="app">

    <div class="top-bar">
      <div class="top-bar-left">
        <ul class="dropdown menu" data-dropdown-menu>
          <li class="menu-text">Conviction Politics Visualisations</li>
        </ul>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <Info></Info>
        </ul>
      </div>
    </div>
    <div class="tab">
      <button v-for="tab in tabs" :key="tab.label" @click="selected = tab.name;" :class="['tab-btn', { active: selected === tab.name }]">
        {{ tab.label }}
      </button>
    </div>
      <component :is="selected"></component>
  </div>

</template>

<script>
/*eslint-disable */
import Info from './components/Info.vue'
import BackdropViz from './components/BackdropViz.vue'
import Offences from './components/Offences.vue'


export default {
  name: 'App',
  components: {
    Offences,
    Info,
    BackdropViz
  },
  data: function() {
    return{
      tabs: [
        {label:"Colonial Backdrop", name:"BackdropViz"},
        {label:"Female Offences", name:"Offences"}
        ],
      selected: "BackdropViz"
    }

  }
}
</script>

<style>
#app {}

.tab {
  overflow: hidden;
  border: 1px solid #ccc;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 14px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #dddddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #dddddd;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}

</style>
