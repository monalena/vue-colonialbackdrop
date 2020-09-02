<template>
    <div class="cell medium-9" >
        <div id="bar_chart"></div>
    </div>
</template>

<script>export default { name: 'Visualisation' }
</script>

<style>
    svg {
        font: 10px sans-serif;
        shape-rendering: crispEdges;
    }

    .axis path,
    .axis line {
        fill: none;
        stroke: #000;
    }

    path.domain {
        stroke: none;
    }

    .y .tick line {
        stroke: #ddd;
    }

</style>
