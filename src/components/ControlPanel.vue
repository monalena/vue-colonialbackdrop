<template>
    <div class="cell medium-3">
        <h6>Selection</h6>
        <div class="button-group stacked hollow" id="selection">
            <a v-for="item in selectionBtns" :key=item.label :class="'button secondary '+isSelected(item)"
               @click="makeSelection(item)">{{item.label}}</a>
        </div>
        <h6>Representation</h6>
        <div class="button-group hollow" >
            <a v-for="item in representationBtns" :key=item.label :class="'button secondary '+isRepresented(item)"
               @click="chooseRepresentation(item)">{{item.label}}</a>
        </div>
        <div>
            <fieldset v-if="selected=='Gender'" class="detail">
                <h6>Detail</h6>
                <div v-for="(item,i) in genderData" :key="item.label">
                    <input :id="item.label" type="checkbox" :value="i" v-model="checkedGender">
                    <label :for="item.label">{{item.label}}</label>
                </div>
            </fieldset>
            <fieldset v-if="selected=='Arrival Ports'" class="detail">
                <h6>Detail</h6>
                <div v-for="(item,i) in arrivalData" :key="item.label">
                    <input :id="item.label" type="checkbox" :value="i" v-model="checkedArrival">
                    <label :for="item.label">{{item.label}}</label>
                </div>
            </fieldset>
            <fieldset v-if="selected=='Departure Ports'" class="detail">
                <h6>Detail</h6>
                <div v-for="(item,i) in departureData" :key="item.label">
                    <input :id="item.label" type="checkbox" :value="i" v-model="checkedDeparture">
                    <label :for="item.label">{{item.label}}</label>
                </div>
            </fieldset>
        </div>
    </div>
</template>

<script>
/*eslint-disable */
    export default {
      name: "Control",
      props:["genderData", "arrivalData", "departureData", "protesterData"],
      components: {
      },
      data: function() {
        return {
          selected:null,
          checkedGender:[],
          checkedArrival:[],
          checkedDeparture:[],
          represented:"Absolute",
          selectionBtns:[
            {label:"Gender",checked:this.checkedGender},
            {label:"Arrival Ports",checked:this.checkedArrival},
            {label:"Departure Ports",checked:this.checkedDeparture},
            {label:"Political Convicts"}
          ],
          representationBtns:[
            {label:"Absolute",action:"loadAbsolute"},
            {label:"Cummulative",action:"loadCummulative"},
          ],
          arrivalFields:[]
        }
      },
      mounted: function() {
        this.checkAll();
        this.selected="Gender";
      },
      computed: {
        currentChecked(){
          switch(this.selected){
            case "Gender":
              return this.checkedGender;
              break;
            case "Arrival Ports":
              return this.checkedArrival;
              break;
            case "Departure Ports":
              return this.checkedDeparture;
              break;
            case "Political Convicts":
              return ["Protesters", "Nonprotesters"];
              break;
          }
        }
      },
      methods: {
        checkAll() {
          this.checkedArrival=[]
          for(var item in this.arrivalData){
            this.checkedArrival.push(item)
          }
          this.checkedDeparture=[]
          for(var item in this.departureData){
            this.checkedDeparture.push(item)
          }
          this.checkedGender=[]
          for(var item in this.genderData){
            this.checkedGender.push(item)
          }
        },
        isSelected(item) {
          if(item.label==this.selected){
            return "active"
          }else{
            return ""
          }
        },
        makeSelection(item) {
            this.checkAll();
            this.selected=item.label;
        },
        isRepresented(item) {
          if(item.label==this.represented){
            return "active"
          }else{
            return ""
          }
        },
        chooseRepresentation(item) {
            this.represented=item.label;
            this.$emit('updateData',this.selected,this.currentChecked,this.represented)
        }
      },
      watch:{
        currentChecked() {
          this.$emit('updateData', this.selected, this.currentChecked, this.represented)
        }
      },
      destroyed: function() {
      }
    }
</script>



<style scoped>
    h6 {
        margin-top: 1rem;
        margin-left: 1rem;
        color: black;
        font-weight: 800;
    }

    button.secondary.active, .button.secondary.active {
        background-color: #dddddd;
    }
    button.secondary.active:hover, .button.secondary.active:hover {
        background-color: #dddddd;
    }

    .button.secondary {
        margin-right: 3px;
    }

</style>
