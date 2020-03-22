<template>
    <div id="app" class="box">

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

        <box-detail-shop
                @boxclosed="boxClosed($event)"
                :value="clicked"
                :storeName="storeName"
                :storeAddress="storeAddress"
                :inventoryStatus="inventoryStatus">
        </box-detail-shop>

    </div>
</template>

<script>

    import L from "leaflet";
    import axios from "axios";
    import BoxDetailShop from "../components/BoxDetailShop";
    import Information from '../assets/information.svg';

    export default {
        name: "NewHome",

        components: {
            BoxDetailShop,
            Information,
        },

        data: function(){
            return{
                showDetail: false,
                inventoryStatus: 'well-filled', //'unknown', 'partly-filled', 'well-filled'
                latitude: null,
                longitude: null,
                accuracy: null,
                storeName: null,
                storeAddress: null,
                clicked:false,
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

            boxClosed(clicked){
                this.clicked = clicked;
            },

            onInformation() {
                this.$router.push('/infos/tuto');
            },
            showOneStore(element) {
                console.log("show one shop");
                console.log(element.id);
                if (element.tags['name'] !== undefined) {
                    this.storeName = element.tags.name;
                }
                let address = '';
                if (element.tags['addr:street'] !== undefined) {
                    address = element.tags['addr:street'];
                }
                if (address.length > 0) {
                    this.storeAddress = address;
                } else {
                    this.storeAddress = null;
                }

                this.showDetail = true;
            },
            showStores(map, response) {
                console.log("SHOW STORE");
                if (response.status !== 200) {
                    return
                }
                console.log(response);

                let myIcon = L.icon({
                    iconUrl: require('../assets/pin-red.png'),
                    iconSize: [25, 34],
                });

                response.data.elements.forEach(element => {
                    console.log(element)
                    console.log(element.tags.name);
                    const marker = L.marker([element.lat, element.lon],{
                        title:"maison",
                        icon : myIcon,
                    }).addTo(map);

                    marker.on('click', () => {
                        this.showOneStore(element);
                        this.clicked = true;
                    });
                });
            },
            constructMap : function(){
                const map = new L.Map('map', {
                    center: new L.LatLng(this.latitude,this.longitude),
                    zoom: 15,
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

                const overpass_query = '[out:json]; (node(around:500.0,' + this.latitude.toString() + ',' + this.longitude.toString() + ')[shop=convenience];); out center;';
                axios
                    .get('http://overpass-api.de/api/interpreter?data=' + overpass_query)
                    .then(response => (this.showStores(map, response)));

                let myIcon = L.icon({
                    iconUrl: require('../assets/marker.png'),
                    iconSize: [25, 38],
                });

                L.marker([this.latitude, this.longitude],{
                    title:"maison",
                    icon : myIcon,
                }).addTo(map).bindPopup('Ma position');
            }
        },
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
        height: calc(100vh - 200px);
    }

    @media (max-width: 800px) {
        .map {
            height: calc(100vh - 275px);
        }
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

    .detail {
        visibility: hidden;
        position: absolute;
        bottom: 0;
        height: 430px;
        background-color: white;
        z-index: 99999;
        margin-left: 0px;
        margin-top: 0px;
        width: 100%;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        text-align: left;
        padding: 10px;
    }

    .store-information {
        font-style: normal;
        font-weight: 600;
        font-size: 26px;
        line-height: 32px;
        text-transform: uppercase;
        color: #FEAD54;
    }

    .waiting {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
    }

    .detail-title {
        display: inline;
        float: left;
        line-height: 18px;
    }

    .waiting-picto {
        width: 18px;
        height: 18px;
        display: inline;
        float: left;
    }

    .waiting-value {
        margin-left: 20px;
        display: inline;
        float: left;
        line-height: 18px;
        font-style: normal;
        font-weight: bold;
        font-size: 10px;
        text-align: center;
        color: #015468;
    }

    .inventory {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
    }

    .inventory-status {
        visibility: hidden;
        display: none;
        height: 32px;
    }

    .visible {
        visibility: visible;
        display: block;
    }

    .rules {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
    }

    .rules-icon {
        width: 32px;
        height: 32px;
        display: inline;

        &.active {
            position: relative;

            &::before {
                content: " ";
                background-image: url(/images/check.svg);
                position: absolute;
                height: 11px;
                width: 16px;
                top: 10px;
                left: -18px;
            }
        }

    }

    button.contribute {
        margin-top: 35px;
        background-color: #079BAB;
        border-radius: 6px;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        width: 100%;
    }

</style>
