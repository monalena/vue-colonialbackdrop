# Vue-ColonialBackdrop

A simple barchart showing the number of people transported to 
Australia between 1788-1868 showing different 
aspects like gender, arrival and destination port as well 
as convicts transported for political reasons. 

The dataset is sourced from 

* Charles Bateson, The convict ships, 1787-1868.
* George Rudé, Protest & Punishment. The Story of Social and Political Protesters transported to Australia, 1788-1868.

Application built with vue.js, Zurb foundation.js and D3.js v5. 

#### Try it out: 

https://monalena.github.io/vue-colonialbackdrop/

## Vue Architecture

* index.html
    * App.vue
        * Info.vue (containing the info button on the top right)
        * BackdropViz.vue
            * ControlPanel.vue
            * Visualisation.vue
            
To insert project somewhere else you need to grab the BackdropViz, ControlPanel and Visualisation Components plus the data 
in public/data.  

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
