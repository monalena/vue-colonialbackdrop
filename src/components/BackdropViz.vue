<template>
    <!-- eslint-disable -->
    <div class="grid-x grid-padding-x">
        <Control @updateData="updateData" :genderData="genderData" :arrivalData="arrivalData"
        :departureData="departureData" :protestData="protestData"></Control>
        <Vis></Vis>
    </div>
</template>

<script>
/* eslint-disable */
    import * as d3 from 'd3';
    import Vis from './Visualisation.vue';
    import Control from './ControlPanel.vue';

  export default {
    name: "BackdropViz",
    components: {
      Vis,
      Control
    },
    data: function () {
      return {
        // Global variables to make data accessible from different functions
        convictData: [],
        genderData:{
          Male:{label:"Male",color:"#287271",cum:"cumMale"},
          Female:{label:"Female",color:"#C64C2E",cum:"cumFemale"}
        },
        arrivalData:{
          NSW:{label:"Sydney",color:"#264653",cum:"cumNSW"},
          VDL:{label:"Hobart",color:"#2a9d8f",cum:"cumVDL"},
          NOR:{label:"Norfolk Island",color:"#8cca9c",cum:"cumNOR"},
          PP:{label:"Port Phillip",color:"#e9c46a",cum:"cumPP"},
          MOR:{label:"Moreton Bay",color:"#e76f51",cum:"cumMOR"},
          WA:{label:"Swan River",color:"#a4290b",cum:"cumWA"}
        },
        departureData:{
          England:{label:"England",color:"#8AB17D",cum:"cumEng"},
          Ireland:{label:"Ireland",color:"#EFB366",cum:"cumIre"},
          Overseas:{label:"Overseas Territory",color:"#E76F51",cum:"cumOve"}
        },
        protestData:{
          Protesters:{label:"Protesters",color:"#264653",cum:"cumProt"},
          Nonprotesters:{label:"Non Protesters",color:"#e9c46a",cum:"cumNon"}
        }
      }
    },
    methods: {
      updateData: function (selected, selectedData, representation) {
        let dataSet
          switch (selected) {
            case "Gender":
              dataSet = this.genderData;
              break;
            case "Arrival Ports":
              dataSet = this.arrivalData;
              break;
            case "Departure Ports":
              dataSet = this.departureData;
              break;
            case "Political Convicts":
              dataSet = this.protestData;
              break;
          }

        let selectedColvars = []
        let selectedLegendVars = []
        let selectedColors = []
        for (var i in selectedData) {
          if(representation=="Absolute"){
            selectedColvars.push(selectedData[i])
          }else{
            selectedColvars.push(dataSet[selectedData[i]].cum)
          }
          selectedLegendVars.push(dataSet[selectedData[i]].label)
          selectedColors.push(dataSet[selectedData[i]].color)
        }

        // Transpose the data into layers
        let dataset = d3.stack()
          .keys(selectedColvars)(this.convictData)
          .map(d => (d.forEach(v => v.key = d.key), d));
        this.createBarchart(dataset, selectedLegendVars, selectedColors);
      },



      // DRAW function to create the bar chart
      createBarchart: function (data, legendvars, selectedColors) {
        d3.select("svg").remove();
        let dataset = data;
        // set the dimensions and margins of the graph
        let margin = {top: 10, right: 160, bottom: 40, left: 40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        let svg = d3.select("#bar_chart")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


        // Set x, y and colors
        let x = d3.scaleBand()
          .domain(dataset[0].map(function (d) {
            return d.data.Year;
          }))
          .rangeRound([10, width - 10], 0.02);

        let y = d3.scaleLinear()
          .domain([0, d3.max(dataset, d => d3.max(d, d => d[1]))])
          .nice()
          .rangeRound([height, 0]);
        // let y = d3.scaleLinear()
        //     .domain([0, d3.max(dataset, function (d) {
        //         return d3.max(d, function (d) {
        //             return d[0] + d[1];
        //         });
        //     })]).nice()
        //     .range([height, 0]);

        let colors = selectedColors.slice(0, dataset.length);

        // Define and draw axes
        let yAxis = d3.axisLeft()
          .scale(y)
          .ticks(10)
          .tickSize(-width, 0, 0)
          .tickFormat(function (d) {
            return d
          });

        let xAxis = d3.axisBottom()
          .scale(x)
          .tickFormat(function (d) {
            return d.getFullYear() % 10 === 0 ? d3.timeFormat("%Y")(d) : ""
          });

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .selectAll("text")
          .attr("y", 0)
          .attr("x", 9)
          .attr("dy", ".35em")
          .attr("transform", "rotate(90)")
          .style("text-anchor", "start");


        // Create groups for each series, rects for each segment
        let groups = svg.selectAll("g.cost")
          .data(dataset)
          .enter()
          .append("g")
          .attr("class", "cost")
          .style("fill", function (d, i) {
            return colors[i];
          });

        let rect = groups.selectAll("rect")
          .data(function (d) {
            return d;
          })
          .enter()
          .append("rect")
          .attr('x', d => x(d.data.Year))
          .attr('y', d => y(d[1]))
          .attr('height', d => y(d[0]) - y(d[1]))
          .attr('width', x.bandwidth() - 1)
          .on("mouseover", function () {
            tooltip.style("display", null);
          })
          .on("mouseout", function () {
            tooltip.style("display", "none");
          })
          .on("mousemove", function (d) {
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d[1]);
          });


        // Draw legend
        let legend = svg.selectAll(".legend")
          .data(colors)
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function (d, i) {
            return "translate(30," + i * 19 + ")";
          });

        legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", function (d, i) {
            return colors.slice()[i];
          });

        legend.append("text")
          .attr("x", width + 5)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "start")
          .text(function (d, i) {
            return legendvars[i];
            // switch (i) {
            //     case 0: return "Female";
            //     case 1: return "Male";
            // }
          });


        // Prep the tooltip bits, initial display is hidden
        let tooltip = svg.append("g")
          .attr("class", "tooltip")
          .style("display", "none");

        tooltip.append("rect")
          .attr("width", 30)
          .attr("height", 20)
          .attr("fill", "white")
          .style("opacity", 0.5);

        tooltip.append("text")
          .attr("x", 15)
          .attr("dy", "1.2em")
          .style("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("font-weight", "bold");
      }


    },
    mounted: function () {

      var dataLoaded = data => {
        // calculate cummulative gender count
        let tempFemale = 0, tempMale = 0;
        let tempNSW = 0, tempVDL = 0, tempNOR = 0, tempPP = 0, tempMOR = 0, tempWA = 0;
        let tempEng = 0, tempIre = 0, tempOve = 0;
        let tempProt = 0, tempNonprot = 0;
        const parse = d3.timeParse("%Y");

        for (var i = 0; i < data.length; i++) {
          //console.log(data[i].NOR);

          data[i].Female = +data[i].Female;
          tempFemale += +data[i].Female;
          data[i].cumFemale = tempFemale;

          data[i].Male = +data[i].Male;
          tempMale += +data[i].Male;
          data[i].cumMale = tempMale;

          data[i].NSW = +data[i].NSW;
          tempNSW += +data[i].NSW;
          data[i].cumNSW = tempNSW;

          data[i].VDL = +data[i].VDL;
          tempVDL += +data[i].VDL;
          data[i].cumVDL = tempVDL;

          data[i].NOR = +data[i].NOR;
          tempNOR += +data[i].NOR;
          data[i].cumNOR = tempNOR;

          data[i].PP = +data[i].PP;
          tempPP += +data[i].PP;
          data[i].cumPP = tempPP;

          data[i].MOR = +data[i].MOR;
          tempMOR += +data[i].MOR;
          data[i].cumMOR = tempMOR;

          data[i].WA = +data[i].WA;
          tempWA += +data[i].WA;
          data[i].cumWA = tempWA;

          data[i].England = +data[i].England;
          tempEng += +data[i].England;
          data[i].cumEng = tempEng;

          data[i].Ireland = +data[i].Ireland;
          tempIre += +data[i].Ireland;
          data[i].cumIre = tempIre;

          data[i].Overseas = +data[i].Overseas;
          tempOve += +data[i].Overseas;
          data[i].cumOve = tempOve;

          data[i].Protesters = +data[i].Protesters;
          tempProt += +data[i].Protesters;
          data[i].cumProt = tempProt;

          data[i].Nonprotesters = +data[i].Nonprotesters;
          tempNonprot += +data[i].Nonprotesters;
          data[i].cumNon = tempNonprot;

          data[i].Year = parse(data[i].Year);

          // console.log(data[i].Year);
        }

        this.convictData = data;


        this.updateData("Gender",["Male","Female"],"Absolute")

      };

      // LOAD function to get data and add cummulative counts
      d3.csv(process.env.BASE_URL+"data/wideData.csv").then(dataLoaded);
    }
  };
</script>


