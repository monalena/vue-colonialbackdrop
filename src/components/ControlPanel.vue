<template>
    <div class="cell medium-3">
        <h6>Selection</h6>
        <div class="button-group stacked hollow" id="selection">
            <a class="button secondary active" id="gender" @click="$emit('loadGender')">Gender</a>
            <a class="button secondary" id="arrival" @click="$emit('loadArrivals')">Arrival Ports</a>
            <a class="button secondary" id="origin" @click="$emit('loadOrigins')">Departure Ports</a>
            <a class="button secondary" id="protester" @click="$emit('loadProtesters')">Political Convicts</a>
        </div>
        <h6>Representation</h6>
        <div class="button-group hollow" >
            <a class="button secondary active" id="absolute" @click="$emit('loadAbsolute')">Absolute</a>
            <a class="button secondary" id="cummulative" @click="$emit('loadCummulative')">Cummulative</a>
        </div>
        <div>
            <fieldset class="detail" id="genderFields">
                <h6>Detail</h6>
                <div>
                    <input id="male" type="checkbox" checked="true" @click="$emit('tickedBoxesTrigger')">
                    <label for="male">Male</label>
                </div>
                <div>
                    <input id="female" type="checkbox" checked="true" @click="$emit('tickedBoxesTrigger')">
                    <label for="female">Female</label>
                </div>
            </fieldset>
            <fieldset class="detail hide" id="arrivalFields">
                <h6>Detail</h6>
                <div>
                    <input id="sydney" type="checkbox" checked="true" @click="$emit('tickedBoxesTrigger')">
                    <label for="sydney">Sydney</label>
                </div>
                <div>
                    <input id="hobart" type="checkbox" checked="true" @click="$emit('tickedBoxesTrigger')">
                    <label for="hobart">Hobart</label>
                </div>
                <div>
                    <input id="norfolk" type="checkbox" checked="true" @click="$emit('tickedBoxesTrigger')">
                    <label for="norfolk">Norfolk Island</label>
                </div>
                <div>
                    <input id="port" type="checkbox" checked="true" @click="$emit('tickedBoxesTrigger')">
                    <label for="port">Port Phillip</label>
                </div>
                <div>
                    <input id="moreton" type="checkbox" checked="true" @click="$emit('tickedBoxesTrigger')">
                    <label for="moreton">Moreton Bay</label>
                </div>
                <div>
                    <input id="swan" type="checkbox" checked="true" @click="$emit('tickedBoxesTrigger')">
                    <label for="swan">Swan River</label>
                </div>
            </fieldset>
            <fieldset class="detail hide" id="departureFields">
                <h6>Detail</h6>
                <div>
                    <input id="england" type="checkbox" checked="true" @click="$emit('tickedBoxesTrigger')">
                    <label for="england">England</label>
                </div>
                <div>
                    <input id="ireland" type="checkbox" checked="true" @click="$emit('tickedBoxesTrigger')">
                    <label for="ireland">Ireland</label>
                </div>
                <div>
                    <input id="overseas" type="checkbox" checked="true" @click="$emit('tickedBoxesTrigger')">
                    <label for="overseas">Overseas Territories</label>
                </div>
            </fieldset>
        </div>
    </div>
</template>

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
