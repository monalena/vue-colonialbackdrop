
<template>
    <div>
        <button class="button float-right secondary tiny" type="button" @mouseover="showDropDown=true" @mouseout="showDropDown=false">
            Info
        </button>
        <div v-if="showDropDown" class="dropdown-pane bottom" >{{information}}</div>
    </div>
</template>

<script>
/* eslint-disable */

  export default {
    name: "Info",
    components: {},
      data: function() {
        return {
          showDropDown: false,
          information: 'The data is sourced from Charles Bateson, The convict ships, 1787-1868 and George Rudé, Protest & Punishment. ' +
            'The Story of Social and Political Protesters transported to Australia, 1788-1868. The application is built with ' +
            'Vue.js, foundation.js and D3.js v5.'
        }
      },
      mounted: function() {
      },
      destroyed: function() {
      }

    }
</script>
<style scoped>
    .dropdown-pane{
        position: absolute;
        z-index: 10;
        top:40px;
        right:0px;
        display: block;
        visibility: visible;
        width: 300px;
        padding: 1rem;
        border: 1px solid #cacaca;
        border-radius: 0;
        background-color: #fefefe;
        font-size: 1rem;
    }
</style>
