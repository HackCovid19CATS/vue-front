<template>

    <div class="container" style="">

        <div class="row" style="margin-top:10%">

            <div class="col-lg-6 col-xs-12">
                <button class="btn btn-block btn-primary" @click="trouver"> Localisez-moi !</button>
            </div>

            <div class="input-group col-lg-6 col-xs-12">
                <input class="form-control" placeholder="rentrez votre addresse exacte" v-model="userAddress">
                <div class="input-group-append">
                    <button class="btn btn-primary" @click="queryToAdress">Go!</button>
                </div>
            </div>
        </div>

        <div class="row" v-if="hasData" style="margin-top: 5%">

            <div class="col-12">

                <div class="card" style="">

                    <div class="card-body">
                        <h5 class="card-title">Vos informations sont-elles correctes ? </h5>
                        <p class="card-text">
                            Code Postale : {{code}} <br>
                            Région : {{region}} <br>
                            Adresse : {{formated}}
                        </p>
                        <div class="col-12">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-success" @click="storeUserData"> Oui !</button>
                                <button type="button" class="btn btn-danger" @click="resetData">Non !</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>
    
</template>

<script>
    import "bootstrap";

    export default {
        name: "UserCoordinate",

        data: function(){
            return {
                userAddress : "1 rue de la mairie saint clément de riviere",
                hasData     : false,
                code        : null,
                rue         : null,
                numero      : null,
                region      : null,
                latitude    : null,
                longitude   : null,
                formated    : null,
                accuracy    : null,

            };
        },

        methods:{

            storeUserData : function (){
                window.sessionStorage.setItem('userLong' , this.longitude);
                window.sessionStorage.setItem('userLat' , this.latitude);
                window.sessionStorage.setItem('accuracy' , (this.accuracy != null) ? this.accuracy : 100)
                this.$router.push({name: 'Map'});
                //this.$router.Location = '/map';
            },

            trouver : function () {
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }

                navigator.geolocation.getCurrentPosition(this.queryFromCoo, this.navigatorError, options);
            },

            navigatorError : function(err){
                let erreur = `ERREUR (${err.code}): ${err.message}`
                console.warn(erreur);
                alert(erreur)
            },

            resetData : function(){
                this.userAddress = "1 rue de la mairie saint clément de riviere"
                this.hasData     = false
                this.code        = null
                this.rue         = null
                this.numero      = null
                this.region      = null
                this.latitude    = null
                this.longitude   = null
                this.formated    = null
                this.accuracy    = null
            },

            queryToAdress : function(){
                this.validAdress(this.userAddress)
            },

            queryFromCoo : function(position){
                this.accuracy = position.coords.accuracy;
                this.validAdress(`${position.coords.latitude},${position.coords.longitude}`)
            },

            validAdress : function(q){

                var api_url = 'https://api.opencagedata.com/geocode/v1/json'

                var request_url = api_url
                    + '?'
                    + 'key=' + process.env.VUE_APP_OCD_API_KEY
                    + '&q=' + q
                    + '&pretty=1'
                    + '&no_annotations=1';

                // see full list of required and optional parameters:
                // https://opencagedata.com/api#forward

                var request = new XMLHttpRequest();
                var data;
                request.open('GET', request_url, true);

                request.onload = () => {
                    // see full list of possible response codes:
                    // https://opencagedata.com/api#codes

                    if (request.status == 200){
                        // Success!
                        data = JSON.parse(request.responseText);
                        console.log(data.results[0])

                        let results = data.results[0];
                        let components = results.components;
                        let geo = results.geometry

                        this.hasData    = true
                        this.code       = components.postcode
                        this.rue        = components.road
                        this.numero     = components.house_number
                        this.region     = components.state
                        this.latitude   = geo.lat
                        this.longitude  = geo.lng
                        this.formated   = results.formatted

                    } else if (request.status <= 500){
                        // We reached our target server, but it returned an error

                        console.log("unable to geocode! Response code: " + request.status);
                        data = JSON.parse(request.responseText);
                        console.log(data.status.message);
                    } else {
                        console.log("server error");
                    }
                };

                request.onerror = function() {
                    // There was a connection error of some sort
                    console.log("unable to connect to server");
                };

                request.send();  // make the request

            }
        }
    }
</script>

<style scoped>
    .routerLink{
        text-decoration: none;
        color: white;
    }
</style>
