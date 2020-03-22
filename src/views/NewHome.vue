<template>
    <div class="box">
        <div class="header">
            <input class="search" type="text" placeholder="Chercher un magasin, pharmacie, ..." />
            <Information class="icon-information" @click="onInformation()"/>
        </div>
        <div class="map" id="map"></div>
        <div class="footer box">
            <ul class="filters">
                <li><button>Alimentation</button></li>
                <li><button>Pharmacie</button></li>
                <li><button>Tabac</button></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Information from '../assets/information.svg';
    import L from "leaflet";

    export default {
        name: "NewHome",
        data: function(){
            return{
                latitude : null,
                longitude : null,
                accuracy : null,
            }
        },
        mounted: function(){
            this.longitude = 2.3750354; //window.sessionStorage.getItem('userLong');
            this.latitude = 48.8412793; //window.sessionStorage.getItem('userLat');
            this.accuracy = 100; //window.sessionStorage.getItem('accuracy')
            console.warn("Lat : " + this.latitude);
            console.warn("Long : " + this.longitude);
            console.warn("Prec : " + this.accuracy);
            this.constructMap();
        },
        methods:{
            onInformation() {
                this.$router.push('/infos/tuto');
            },
            constructMap : function(){
                const map = new L.Map('map', {
                    center: new L.LatLng(this.latitude,this.longitude),
                    zoom: 18,
                    maxZoom: 18,
                });

                const osm = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
                map.addLayer(osm);

                L.circle([this.latitude, this.longitude], {
                    color: 'teal',
                    fillColor: 'teal',
                    fillOpacity: 0.5,
                    radius: (this.accuracy * 0.360)
                }).addTo(map);

                let myIcon = L.icon({
                    iconUrl: require('../assets/marker.png'),
                    iconSize: [25, 38],
                });

                L.marker([this.latitude, this.longitude],{
                    title:"maison",
                    icon : myIcon,
                }).addTo(map).bindPopup('Ouvert 24/24 <br> La maison du bonheur');
            }
        },
        components: {
            Information
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .header {
        height: 68px;
        background-color: white;
        display: flex;
    }

    .footer {
        width: 100%;
        height: 68px;
        background-color: white;
        position: absolute;
        bottom: 0;
    }

    .map {
        width: 100%;
        height: calc(100vh - 136px);
    }

    ul.filters {
        margin-top: 14px;
        padding-left: 0px;
        list-style: none;
        display: flex;
        justify-content: space-around;

        & > li > button {
            margin-top: 5px;
            background-color: #ECECEC;
            border: none;
            border-radius: 6px;
            color: #079BAB;
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 5px;
            padding-bottom: 5px;
        }

    }

    .search {
        margin-top: 15px;
        margin-left: 20px;
        padding-left: 5px;
        padding-right: 5px;
        width: calc(100% - 40px);
        height: 39px;
        border: none;
        border-radius: 6px;
        background-color: #ECECEC;
        color: #454545;
    }

    .icon-information {
        margin-top: 21px;
        margin-left: 20px;
        margin-right: 20px;
        width: 25px;
        height: 25px;
        cursor: pointer;
    }
</style>
