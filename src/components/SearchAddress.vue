<template>

    <div>
        <!--<input class="search" type="text" placeholder="Chercher un magasin, pharmacie, ..." />-->
        <input type="text" class="search">
        <Information class="icon-information" @click="onInformation()"/>
    </div>


    
</template>

<script>

    import Information from '../assets/information.svg';

    export default {
        name: "SearchAddress",
        props : ["value"],

        components:{
          Information,
        },

        methods:{

            onInformation() {
                this.$router.push('/infos/tuto');
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

</style>
