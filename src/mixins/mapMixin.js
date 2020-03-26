import axios from "axios";
import L from "leaflet";

export default {
    methods: {
        test(value) {
            alert(value);
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

        removeMarkers() {
            this.markers.forEach(marker => {
                this.map.removeLayer(marker);
            });
            this.markers = [];
        },

        areAllMarkersSelected() {
            return this.showGrocery && this.showMedical && this.showNews;
        },

        setAllFiltersTo(booleanValue) {
            this.showGrocery = booleanValue;
            this.showNews = booleanValue;
            this.showMedical = booleanValue;
        },

        onShowGrocery() {
            this.removeMarkers();
            if (this.areAllMarkersSelected()) {
                this.setAllFiltersTo(false);
                this.showGrocery = true;
            } else if (!this.showNews && !this.showMedical) {
                this.setAllFiltersTo(true);
            } else {
                this.showGrocery = !this.showGrocery;
            }
            this.showStores();
        },

        onShowMedical() {
            this.removeMarkers();
            if (this.areAllMarkersSelected()) {
                this.setAllFiltersTo(false);
                this.showMedical = true;
            } else if (!this.showNews && !this.showGrocery) {
                this.setAllFiltersTo(true);
            } else {
                this.showMedical = !this.showMedical;
            }
            this.showStores();
        },

        onShowNews() {
            this.removeMarkers();
            if (this.areAllMarkersSelected()) {
                this.setAllFiltersTo(false);
                this.showNews = true;
            } else if (!this.showGrocery && !this.showMedical) {
                this.setAllFiltersTo(true);
            } else {
                this.showNews = !this.showNews;
            }
            this.showStores();
        },

        setArea() {
            this.area = L.circle([this.latitude, this.longitude], {
                color: '#FEAD54',
                fillColor: '#D6D6D6',
                fillOpacity: 0.31,
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
            let radius = 1000.0;
            this.callStores(radius);
        },

        callStores(radius){
            let overpass_query = `
						[out:json];
						(
							node(around:${radius}, ${this.latitude}, ${this.longitude}) ["amenity"~"pharmacy"];
							node(around:${radius}, ${this.latitude}, ${this.longitude}) ["shop"];
							way(around:${radius}, ${this.latitude}, ${this.longitude}) ["amenity"~"pharmacy"];
							way(around:${radius}, ${this.latitude}, ${this.longitude}) ["shop"];
						);
						out center;
						`;
            axios
                .get('https://overpass-api.de/api/interpreter?data=' + overpass_query)
                .then((response) => {
                    if (response.status === 200) {
                        // Ajout des établissements dans la liste

                        /*if(response.data.elements === 0) {
                            radius = radius + 5000.0;
                            console.log("callStores --> radius : " + radius);
                            this.callStores(radius);
                        }*/
                        this.stores = response.data.elements;
                        this.showStores();
                    } else {
                        console.log('une erreur est survenue : ' + response.status);
                    }
                }).catch(error => console.log(error));
        },

        searchContributions(osmId) {
            axios
                .get('https://qztfkr37s9.execute-api.eu-west-3.amazonaws.com/dev/store?OSMNodeId=' + osmId)
                .then((response) => {
                    if (response.status === 200) {
                        if(response.data !== null) {
                            this.storeStocks = response.data.etatDesStocks;
                            this.storeStatus = response.data.ouvert;
                            this.storeWaiting = response.data.tempsAttente;
                            this.storeGloves = response.data.portDesGants;
                            this.storeMasks = response.data.portDuMasque;
                            this.storeDistance = response.data.respectDesDistances;
                            this.storeNumberOfContribution = response.data.nombreDeContribution;
                            this.storeTimeOfLastContribution = response.data.heureDerniereContribution;
                            this.storeDateLastContribution = response.data.dateDeContribution;
                        } else {
                            this.storeStocks = null;
                            this.storeStatus = null;
                            this.storeWaiting = null;
                            this.storeGloves = null;
                            this.storeMasks = null;
                            this.storeDistance = null;
                            this.storeNumberOfContribution = null;
                            this.storeTimeOfLastContribution = null;
                            this.storeDateLastContribution = null;
                        }
                    }
                })
                .catch(error => console.log(error));

        },

        showOneStore(element) {
            console.log("showOneStore");
            // Au clic sur un établissement, affichage du détail
            this.storeName = '';
            if (element.tags['name'] !== undefined) {
                this.storeName = element.tags.name;
            }
            let address = '';
            let housenumber = '';
            let street = '';
            let city = '';
            if (element.tags['addr:street'] !== undefined) {
                street = element.tags['addr:street'];
                // On ne récupère le numéro que si la rue est définie
                if (element.tags['addr:housenumber'] !== undefined) {
                    housenumber = element.tags['addr:housenumber'] + ', ';
                }
            }
            if (element.tags['addr:city'] !== undefined) {
                city =  element.tags['addr:city'];
            }
            // Mise en forme de l'adresse
            if(street !== '') {
                address = housenumber + street;
            }
            if (address !== '' && city !== '') {
                address = address + ', ';
            }
            address = address + city;

            if (address.length > 0) {
                this.storeAddress = address;
            } else {
                this.storeAddress = null;
            }
            if (element.id !== undefined) {
                this.storeOsmId = element.id;
            }
            if (element.lon !== undefined) {
                this.storeLon = element.lon;
            }
            if (element.lat !== undefined) {
                this.storeLat = element.lat;
            }

            this.showBoxDetail();

            this.searchContributions(this.storeOsmId);

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
                        const lat = element.lat || element.center.lat;
                        const lon = element.lon || element.center.lon;
                        const marker = L.marker([lat, lon],{
                            title: "Boutique",
                            icon : iconNews,
                        }).addTo(this.map);
                        marker.on('click', () => {this.showOneStore(element)});
                        this.markers.push(marker);
                    }
                } else if (medicalStore.includes(element.tags['amenity'])) {
                    if (this.showMedical) {
                        const lat = element.lat || element.center.lat;
                        const lon = element.lon || element.center.lon;
                        const marker = L.marker([lat, lon],{
                            title: "Boutique",
                            icon : iconMedical,
                        }).addTo(this.map);
                        marker.on('click', () => {this.showOneStore(element)});
                        this.markers.push(marker);
                    }
                } else if (groceryStore.includes(element.tags['shop'])) {
                    if (this.showGrocery) {
                        const lat = element.lat || element.center.lat;
                        const lon = element.lon || element.center.lon;
                        const marker = L.marker([lat, lon],{
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

    }
};