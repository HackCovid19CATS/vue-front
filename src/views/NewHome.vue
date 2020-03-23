<template>
    <div id="app" class="box">

        <div class="header">
            <input class="search" type="text" placeholder="Chercher un magasin, pharmacie, ..." v-on:keyup.enter="onEnter"/>
            <Information class="icon-information" @click="onInformation()"/>
        </div>

        <div class="map" id="map"></div>
        <div class="footer box">
            <ul class="filters">
                <li><button :class="{ active: showGrocery }" @click="onShowGrocery()">Alimentation</button></li>
                <li><button :class="{ active: showMedical }" @click="onShowMedical()">Pharmacie</button></li>
                <li><button :class="{ active: showNews }" @click="onShowNews()">Tabac</button></li>
            </ul>
        </div>

        <box-detail-shop
                @boxclosed="boxClosed($event)"
                :value="clicked"
                :storeName="storeName"
                :storeAddress="storeAddress"
				:storeStocks="storeStocks"
				:storeStatus="storeStatus"
				:storeWaiting="storeWaiting"
				:storeGloves="storeGloves"
				:storeMasks="storeMasks"
				:storeDistance="storeDistance"
				>
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
                latitude: 48.853123,
                longitude: 2.349924,
                address: 'Ma position',
                map: null,
                showDetail: false,
                showGrocery: true,
                showMedical: false,
                showNews: false,
                myLocation: null,
                area: null,
                stores: [],
                markers: [],
                inventoryStatus: 'well-filled', //'unknown', 'partly-filled', 'well-filled'
                accuracy: null,
                storeName: null,
                storeAddress: null,
				storeId: 'ze4r8ze4re',
				storeOsmType : null,
				storeOsmId : 123,
				storecategory : null,
				storeType : null,
				storeLon : 1221,
				storeLat : 1221,
				storeStocks : 30,
				storeStatus : true,
				storeWaiting : 456,
				storeGloves : true,
				storeMasks : false,
				storeDistance : true,
                clicked:false
            }
        },

        mounted: function(){
            this.accuracy = 2000;
            this.locateMe();
        },

        methods:{

            boxClosed(clicked) {
                this.clicked = clicked;
            },

            locateMe: function () {
                let options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };

                navigator.geolocation.getCurrentPosition(this.showMyLocation, this.locateError, options);
            },
            locateError : function(err){
                console.warn( `ERREUR (${err.code}): ${err.message}`);
                this.constructMap();
            },
            showMyLocation : function(position){
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;

                this.constructMap();
            },
            navigatorError : function(err){
                let erreur = `ERREUR (${err.code}): ${err.message}`
                console.warn(erreur);
                alert(erreur)
            },
            onEnter(event) {
                const query = event.target.value.split(' ').join('%20');
                axios
                    .get(`https://nominatim.openstreetmap.org/search/${query}?format=json&addressdetails=1&limit=1`)
                    .then((response) => {
                        if (response.status === 200) {
                            this.latitude = response.data[0]['lat'];
                            this.longitude = response.data[0]['lon'];
                            if (this.area !== null) {
                                this.map.removeLayer(this.area);
                            }
                            if (this.myLocation !== null) {
                                this.map.removeLayer(this.myLocation);
                            }
                            this.removeMarkers();
                            this.map.panTo(new L.LatLng(this.latitude, this.longitude));
                            this.setArea();
                            this.setMyLocation();
                            this.searchStore();
                        }
                    });
            },
            onClose() {
                this.showDetail = false;
            },
            onContribute: function () {
                this.$router.push('/contribution')
            },

            onInformation() {
                this.$router.push('/infos/tuto');
            },
            removeMarkers() {
                this.markers.forEach(marker => {
                    this.map.removeLayer(marker);
                });
                this.markers = [];
            },
            onShowGrocery() {
                this.removeMarkers();
                this.showGrocery = true;
                this.showMedical = false;
                this.showNews = false;
                this.showStores();
            },
            onShowMedical() {
                this.removeMarkers();
                this.showGrocery = false;
                this.showMedical = true;
                this.showNews = false;
                this.showStores();
            },
            onShowNews() {
                this.removeMarkers();
                this.showGrocery = false;
                this.showMedical = false;
                this.showNews = true;
                this.showStores();
            },
            setArea() {
                this.area = L.circle([this.latitude, this.longitude], {
                    color: 'teal',
                    fillColor: 'teal',
                    fillOpacity: 0.5,
                    radius: (this.accuracy * 0.360)
                }).addTo(this.map);
            },
            setMyLocation() {
                let myIcon = L.icon({
                    iconUrl: require('../assets/locator_me.png'),
                    iconSize: [26, 26],
                });

                this.myLocation = L.marker([this.latitude, this.longitude],{
                    title:"maison",
                    icon : myIcon,
                }).addTo(this.map).bindPopup(this.address);
            },
            searchStore() {
                const overpass_query = `
                    [out:json];
                    (
                        node(around:1000.0, ${this.latitude}, ${this.longitude}) ["amenity"~"pharmacy"];
                        node(around:1000.0, ${this.latitude}, ${this.longitude}) ["shop"];
                    );
                    out center;
                    `;
				axios
                    .get('https://overpass-api.de/api/interpreter?data=' + overpass_query)
                    .then((response) => {
                        if (response.status === 200) {
							// Ajout des établissements dans la liste
                            this.stores = response.data.elements;
                            this.showStores();
                        }
                    });
            },
			searchContributions() {				
				axios
                    //.get('https://qztfkr37s9.execute-api.eu-west-3.amazonaws.com/dev/store?nodeId=${this.storeOsmId}')
					.get('https://qztfkr37s9.execute-api.eu-west-3.amazonaws.com/dev/store?nodeId=cbd4e2c449505fe0930f226c22894e46')
                    .then((response) => {
                        if (response.status === 200) {
							console.log(response.data);
							this.storeStocks = response.data.etatDesStocksPourcent;
							this.storeStatus = response.data.ouvert;
							this.storeWaiting = response.data.tempsDAttente;
							this.storeGloves = response.data.portDesGants;
							this.storeMasks = response.data.portDuMasque;
							this.storeDistance = response.data.respectDesDistances;
							
                        }
                    })
					.catch(error => console.log(error));
				
            },
            showOneStore(element) {
				// Au clic sur un établissement, affichage du détail
				
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
				if (element.tags['place_id'] !== undefined) {
                    this.storeId = element.tags.place_id;
                }
				if (element.tags['osm_id'] !== undefined) {
                    this.storeOsmId = element.tags.osm_id;
                }
				if (element.tags['osm_type'] !== undefined) {
                    this.storeOsmType = element.tags.osm_type;
                }
				if (element.tags['category'] !== undefined) {
                    this.storecategory = element.tags.category;
                }
				if (element.tags['type'] !== undefined) {
                    this.storeType = element.tags.type;
                }
				if (element.tags['lon'] !== undefined) {
                    this.storeLon = element.tags.lon;
                }
				if (element.tags['lat'] !== undefined) {
                    this.storeLat = element.tags.lat;
                }

                this.showDetail = true;
                this.clicked = true;
				
				this.searchContributions();
				
									
				
            },
            showStores() {
                const groceryStore = ['bakery', 'butcher', 'cheese', 'convenience', 'deli', 'dairy', 'farm', 'frozen_food', 'organic', 'pasta', 'pastry', 'seafood', 'department_store', 'general', 'supermarket'];
                const medicalStore = ['pharmacy'];
                const newsStore = ['kiosk', 'newsagent', 'e-cigarettet', 'tobacco'];

                let iconGrocery = L.icon({
                    iconUrl: require('../assets/locator_grocery_ok.png'),
                    iconSize: [24, 33],
                });
                let iconMedical = L.icon({
                    iconUrl: require('../assets/locator_pharmacy_ok.png'),
                    iconSize: [24, 33],
                });
                let iconNews = L.icon({
                    iconUrl: require('../assets/locator_newspapers_ok.png'),
                    iconSize: [24, 33],
                });

                this.stores.forEach(element => {
                    if (newsStore.includes(element.tags['shop'])) {
                        if (this.showNews) {
                            const marker = L.marker([element.lat, element.lon],{
                                title: "Boutique",
                                icon : iconNews,
                            }).addTo(this.map);
                            marker.on('click', () => {this.showOneStore(element)});
                            this.markers.push(marker);
                        }
                    } else if (medicalStore.includes(element.tags['amenity'])) {
                        if (this.showMedical) {
                            const marker = L.marker([element.lat, element.lon],{
                                title: "Boutique",
                                icon : iconMedical,
                            }).addTo(this.map);
                            marker.on('click', () => {this.showOneStore(element)});
                            this.markers.push(marker);
                        }
                    } else if (groceryStore.includes(element.tags['shop'])) {
                        if (this.showGrocery) {
                            const marker = L.marker([element.lat, element.lon],{
                                title: "Boutique",
                                icon : iconGrocery,
                            }).addTo(this.map);
                            marker.on('click', () => {this.showOneStore(element)});
                            this.markers.push(marker);
                        }
                    }
                });
            },
            constructMap : function(){
                axios
                    .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.latitude}&lon=${this.longitude}`)
                    .then((response) => {
                        if (response.status === 200) {
                            this.address = response.data.display_name;
                        }
                    });

                this.map = new L.Map('map', {
                    center: new L.LatLng(this.latitude,this.longitude),
                    zoom: 15,
                    maxZoom: 18,
                });

                const osm = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
                this.map.addLayer(osm);

                this.setArea();

                this.setMyLocation();

                this.searchStore();
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
        height: 78px;
        background-color: white;
        position: absolute;
        bottom: 0;
    }

    .map {
        width: 100%;
        height: calc(100vh - 150px);
    }

    @media (max-width: 800px) {
        .map {
            height: calc(100vh - 150px);
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

            &.active {
                background-color: #079BAB;
                color: white;
            }
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
        outline: none;
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
