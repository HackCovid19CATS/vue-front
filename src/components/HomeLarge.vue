<template>
    <vue100vh :css="{height: '100rvh'}" class="home-container">
        <div class="header">
            <input class="search"
                   type="text"
                   placeholder="Chercher un magasin, pharmacie, ..."
                   v-model.lazy="queryString"
                   v-on:keyup.enter="onEnter"
            />
            <Magnifer class="icon-magnifer" />
        </div>

        <div class="home-view">
            <div class="map" id="map">
                <ul class="filters">
                    <li><button :class="{ active: showGrocery }" @click="onShowGrocery()">Alimentation</button></li>
                    <li><button :class="{ active: showMedical }" @click="onShowMedical()">Pharmacie</button></li>
                    <li><button :class="{ active: showNews }" @click="onShowNews()">Tabac</button></li>
                </ul>
            </div>

            <div class="detail" v-if="storeSelected === false">
                <div class="detail-title">LES MAGASINS</div>
                <div class="detail-subtitle">Proche de chez vous</div>
                <hr class="detail-separator" />
                <div class="detail-message">Vous n’avez pas sélectionné de magasin :)</div>
            </div>

            <div class="detail" v-if="storeSelected === true">
                <div class="detail-title">LES MAGASINS</div>
                <div class="detail-subtitle">Proche de chez vous</div>
                <hr class="detail-separator" />
                <div class="detail-store">
                    <box-detail-shop
                            :showClose="0"
                            @boxclosed="boxClosed($event)"
                            :storeName="storeName"
                            :storeAddress="storeAddress"
                            :storePhone="storePhone"
                            :storeOpeningHours="storeOpeningHours"
                            :storeOsmId="storeOsmId"
                            :linkOSM="linkOSM"
                            :storeStocks="storeStocks"
                            :storeStatus="storeStatus"
                            :storeWaiting="storeWaiting"
                            :storeGloves="storeGloves"
                            :storeMasks="storeMasks"
                            :storeDistance="storeDistance"
                            :storeNumberOfContribution="storeNumberOfContribution"
                            :storeTimeOfLastContribution="storeTimeOfLastContribution"
                            :storeDateLastContribution="storeDateLastContribution"
                            :selectedStore="selectedStore"
                    >
                    </box-detail-shop>
                </div>
            </div>
        </div>


        <div class="footer link-info" @click="onInformation()">
            <Information class="icon-information"/>
            <span>Rappel des consignes pour faire ses courses</span>
        </div>
    </vue100vh>
</template>

<script>
    import vue100vh from 'vue-100vh'
    import mapMixin from "../mixins/mapMixin";
    import BoxDetailShop from "../components/BoxDetailShop";
    import Information from '../assets/information.svg';
    import Magnifer from "../assets/magnifer.svg";

    export default {
        name: "HomeLarge",

        components: {
            vue100vh,
            BoxDetailShop,
            Information,
            Magnifer,
        },

        data: function(){
            return{
                storeSelected: false,
                latitude: 48.853123,
                longitude: 2.349924,
                address: 'Ma position',
                map: null,
                showDetail: false,
                showGrocery: true,
                showMedical: true,
                showNews: true,
                myLocation: null,
                area: null,
                stores: [],
                markers: [],
                contributions: [],
                accuracy: null,
                storeName: null,
                storeAddress: null,
                storePhone: null,
                storeOpeningHours: null,
                storeId: null,
                storeOsmId : null,
                linkOSM: '',
                storeStocks : null, // 'empty', 'partly-filled', 'well-filled'
                storeStatus : null,
                storeWaiting : null,
                storeGloves : null,
                storeMasks : null,
                storeDistance : null,
                selectedStore : null,
                storeNumberOfContribution : null,
                storeTimeOfLastContribution : null,
                storeDateLastContribution : null,
                queryString: '',
                clicked: false,
            }
        },

        mounted: function(){
            this.accuracy = 2000;
            this.locateMe();
        },

        mixins: [mapMixin],

        methods:{
            onClose() {
                this.showDetail = false;
            },
            onContribute: function () {
                this.$router.push('/contribution')
            },
            onInformation() {
                this.$router.push('/tuto');
            },
            showBoxDetail() {
                this.storeSelected = true;
                this.clicked = true;
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .header {
        height: 70px;
        background-color: white;
        display: flex;
    }

    .footer {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: #079BAB;
        color: white;
        //position: absolute;
        font-size: 16px;
        bottom: 0;
    }

    .home-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .home-view {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
    }

    .map {
        width: 50%;
    }

    ul.filters {
        position: absolute;
        top: 0px;
        width: 100%;
        z-index: 99999;
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
        margin-right: 20px;
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

    .icon-magnifer {
        margin-top: 6px;
        margin-right: 20px;
        width: 21px;
    }

    .icon-information {
        /*margin-top: 21px;*/
        margin-left: 20px;
        margin-right: 20px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    hr.detail-separator {
        border: 2px solid #015468;
        width: 200px;
    }

    .detail {
        display: block;
        background-color: white;
        width: 50%;
    }

    .detail-message {
        color: black;
        font-size: 16px;
        margin-top: 70px;
    }

    .detail-store {
        margin-left: 50px;
        margin-right: 50px;
    };

    .detail-subtitle {
        color: rgb(7, 155, 171);
        font-size: 28px;
        text-align: center;
    }

    .detail-title {
        color: rgb(254, 173, 84);
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        margin-top: 30px;
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

    .link-info {
        cursor: pointer;
    }
</style>
