
<template>
    <div>
        <button class="button float-right secondary tiny" type="button" data-toggle="dropdown2">
            Info
        </button>
        <div class="dropdown-pane bottom" id="dropdown2" dropdown>{{information}}</div>
    </div>
</template>

<script>
/* eslint-disable */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
library.add(faInfo);
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  import { Foundation } from "foundation-sites";
  import jQuery from 'jquery';

  export default {
    name: "Info",
    components: {
      //Foundation,
      FontAwesomeIcon},
      data: function() {
        return {
          information: 'The data is sourced from Charles Bateson, The convict ships, 1787-1868 and George Rudé, Protest & Punishment. ' +
            'The Story of Social and Political Protesters transported to Australia, 1788-1868. The application is built with ' +
            'Vue.js, foundation.js and D3.js v5.'
        }
      },
      mounted: function() {
          // this.dropdown1 = new Foundation.Dropdown(jQuery('#dropdown1'), {
          //     // These options can be declarative using the data attributes
          //     vOffset: 20,
          // });
          this.dropdown2 = new Foundation.Dropdown(jQuery('#dropdown2'), {
              hover: true,
          });
      },
      destroyed: function() {
          // this.dropdown1.destroy();
          this.dropdown2.destroy();
      }

    }
</script>
