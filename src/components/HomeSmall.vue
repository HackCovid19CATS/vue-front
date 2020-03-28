<template>
    <vue100vh :css="{height: '100rvh'}" class="home-container">

        <div class="header">
            <input class="search" type="text" placeholder="Chercher un magasin, pharmacie, ..." v-on:keyup.enter="onEnter"/>
            <Magnifer class="icon-magnifer" />
        </div>

        <div>
            <ul class="filters">
                <li><button :class="{ active: showGrocery }" @click="onShowGrocery()">Alimentation</button></li>
                <li><button :class="{ active: showMedical }" @click="onShowMedical()">Pharmacie</button></li>
                <li><button :class="{ active: showNews }" @click="onShowNews()">Tabac</button></li>
            </ul>
        </div>

        <div class="home-view">
            <div class="map" id="map"></div>
        </div>

        <div style="position: absolute; bottom: 0; left: 50%;" v-if="this.clicked">
            <div class="detail" style="position: relative; left: -50%;">
                <box-detail-shop
                        :showClose="1"
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

        <div class="footer link-info" @click="onInformation()">
            <Information class="icon-information"/>
            <span>Rappel des consignes pour faire ses courses</span>
        </div>
    </vue100vh>
</template>

<script>
    import vue100vh from 'vue-100vh'
    import BoxDetailShop from "../components/BoxDetailShop";
    import Information from '../assets/information.svg';
    import Magnifer from '../assets/magnifer.svg';
    import mapMixin from "../mixins/mapMixin";

    export default {
        name: "HomeSmall",

        components: {
            vue100vh,
            BoxDetailShop,
            Information,
            Magnifer,
        },

        data: function(){
            return{
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
                linkOSM: '',
                storeOsmId : null,
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

            boxClosed(clicked) {
                this.clicked = clicked;
            },

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
                this.showDetail = true;
                this.clicked = true;
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .home-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

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
        font-size: 12px;
        bottom: 0;
    }

    .home-view {
        flex-grow: 1;
        height: calc(100% - 120px);
    }

    .map {
        height: 100%;
        width: 100%;
    }

    ul.filters {
        position: absolute;
        top: 50px;
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
            padding: 5px 20px;
            font-size: 12px;

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
        font-size: 12px;
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

    .detail {
        //visibility: hidden;
        position: absolute;
        bottom: 50px;
        height: 490px;
        //margin-top: -230px;
        background-color: white;
        z-index: 99999;
        margin-left: 5px;
        margin-right: 5px;
        width: 100%;
        min-width: 375px;
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

    .link-info {
        cursor: pointer;
    }
</style>
