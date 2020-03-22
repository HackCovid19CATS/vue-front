<template>

    <div class="detail box visible" v-if="value">

        <button type="button" class="close" @click="maskBox">
            <span aria-hidden="true">&times;</span>
        </button>

        <div class="store-information">{{storeName}}</div>
        <div class="store-information">{{storeAddress}}</div>
        <div class="waiting">
            <div class="detail-title">Temps d’attente</div>
            <div>
                <Clock class="waiting-picto" />
                <div class="waiting-value">45 min en moyenne</div>
            </div>
        </div>
        <div class="inventory">
            <div class="detail-title">Etat des stocks</div>
            <Empty class="inventory-status"  :class="{ visible: inventoryStatus === 'empty' }"/>
            <PartlyFilled class="inventory-status"  :class="{ visible: inventoryStatus === 'partly-filled' }"/>
            <WellFilled class="inventory-status"  :class="{ visible: inventoryStatus === 'well-filled' }"/>
        </div>
        <div class="rules">
            <div class="detail-title">Respect des règles</div>
            <div class="rules-icon active">
                <IconDistance  />
            </div>
            <div class="rules-icon">
                <IconMask class="rules-icon" />
            </div>
            <div class="rules-icon">
                <IconGloves class="rules-icon" />
            </div>
        </div>
        <button class="contribute" v-on:click="onContribute">Contribuer</button>
    </div>
    
</template>

<script>

    import Clock from '../assets/clock.svg';
    import Empty from '../assets/empty.svg';
    import PartlyFilled from '../assets/partly-filled.svg';
    import WellFilled from '../assets/well-filled.svg';
    import IconDistance from '../assets/icon-distance.svg';
    import IconMask from '../assets/icon-mask.svg';
    import IconGloves from '../assets/icon-gloves.svg';

    export default {
        name: "BoxDetailShop",
        components : {
            Clock,
            Empty,
            PartlyFilled,
            WellFilled,
            IconDistance,
            IconMask,
            IconGloves
        },

        data : function(){
            return {
                showBox: this.value,
            }
        },

        props:["storeName" , "storeAddress" , "inventoryStatus" , "value"],

        methods:{

            onContribute: function () {
                this.$router.push('/contribution');
            },

            maskBox: function () {
                this.$emit('boxclosed' , false);
            },
        },

        mounted() {
            console.log("detail : " +  this.value);
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

    .detail {
        /*visibility: hidden;*/
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
        /*visibility: hidden;*/
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
