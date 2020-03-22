<template>

    <div>
        <div style="width: 100vw; height: 100vh" id="map"></div>
    </div>


</template>

<script>
    import L from 'leaflet';
    import axios from 'axios';

    export default {
        name: "Map",
        data: function(){
            return{
                latitude : null,
                longitude : null,
                accuracy : null,
            }
        },

        mounted: function(){
            this.longitude = window.sessionStorage.getItem('userLong');
            this.latitude = window.sessionStorage.getItem('userLat');
            this.accuracy = window.sessionStorage.getItem('accuracy')
            console.warn("Lat : " + this.latitude);
            console.warn("Long : " + this.longitude);
            console.warn("Prec : " + this.accuracy);
            this.constructMap();
        },

        methods:{
            constructMap : function(){


                const map = new L.Map('map', {
                        center: new L.LatLng(this.latitude,this.longitude),
                        zoom: 18,
                        maxZoom: 18,
                });

                const osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
                map.addLayer(osm);

                L.circle([this.latitude, this.longitude], {
                    color: 'teal',
                    fillColor: 'teal',
                    fillOpacity: 0.5,
                    radius: (this.accuracy * 0.360)
                }).addTo(map);


                console.log("before axios");
                axios
                    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                    .then(response => (console.log(response)));



                let myIcon = L.icon({
                    iconUrl: require('../assets/marker.png'),
                    iconSize: [25, 38],
                });


                L.marker([this.latitude, this.longitude],{
                    title:"maison",
                    icon : myIcon,
                }).addTo(map).bindPopup('Ouvert 24/24 <br> La maison du bonheur');

            }
        }
    }
</script>

<style scoped>

</style>
