<template>
    <div class="box box-container">
        <div class="bar">
            <button type="button" class="close" aria-label="Close" @click="onClose()">
                <span aria-hidden="true">×</span>
            </button>
        </div>
        <div class="title">Contribution</div>
        <div class="message">
            Vous êtes actuellement dans ce magasin ?<br />
            Partagez votre expérience dès votre retour à la maison pour en informer les autres !
        </div>
        <div class="shop-information">
            <div class="shop-name">{{shopName}}</div>
            <div class="shop-address" v-if="shopAdress != 'null'">{{shopAdress}}</div>
            <div class="shop-address" v-else> Addresse non disponible</div>
        </div>
        <div class="subtitle">Temps d’attente</div>
        <div class="question">Combien de temps vous avez attendu ?</div>
        <ul class="how-long">
            <li :class="{active : indexInputAttente == 0}" @click="setTimeAttente(10 , 0)" style="cursor: pointer">10 min</li>
            <li :class="{active : indexInputAttente == 1}" @click="setTimeAttente(20 , 1)" style="cursor: pointer">20 min</li>
            <li :class="{active : indexInputAttente == 2}" @click="setTimeAttente(30 , 2)" style="cursor: pointer">30 min</li>
            <li :class="{active : indexInputAttente == 3}" @click="setTimeAttente(40 , 3)" style="cursor: pointer">40 min</li>
            <li :class="{active : indexInputAttente == 4}" @click="setTimeAttente(50 , 4)" style="cursor: pointer">+50 min</li>
        </ul>
        <div class="subtitle">Stock</div>
        <div class="question">Quel est l’état du stock du magasin ?</div>
        <ul class="stock">
            <li :class="{active : input.etatDesStocks == 'empty' || input.etatDesStocks == 'partly-filled' || input.etatDesStocks == 'well-filled' }"
                @click="setStock('empty')" style="cursor: pointer">Vide</li>
            <li :class="{active : input.etatDesStocks == 'partly-filled' || input.etatDesStocks == 'well-filled' }"
                @click="setStock('partly-filled')" style="cursor: pointer"> En partie rempli</li>
            <li :class="{active : input.etatDesStocks == 'well-filled'}"
                @click="setStock('well-filled')" style="cursor: pointer">Bien rempli</li>
        </ul>
        <div class="subtitle">Respect des règles</div>
        <div class="question">
            L’établissement respecte t-il les règles mise en place ?
        </div>
        <div :class="classDistance" style="margin-top: 32px" @click="setIconState('respectDesDistances')">
            <Distance class="icon"/>
            Respect des distances
            <div class="checkbox"></div>
        </div>
        <div :class="classMask" style="margin-top: 16px" @click="setIconState('portDuMasque')">
            <WearingMask class="icon" />
            Port du masque
            <div class="checkbox"></div>
        </div>
        <div :class="classGloves" style="margin-top: 16px" @click="setIconState('portDesGants')">
            <Gloves class="icon" />
            Port des gants
            <div class="checkbox"></div>
        </div>
        <button :class="classBtnContribution" v-on:click="contribute">Contribuer</button>
    </div>
</template>

<script>
    import Distance from '../assets/distance.svg';
    import WearingMask from '../assets/mask.svg';
    import Gloves from '../assets/gloves.svg';
    import axios from "axios";
    //import md5 from 'crypto-js/md5';

    export default {
        name: "Contribution",
        components: {
            Distance,
            WearingMask,
            Gloves,
        },
        props:["shopName" , "shopId" , "shopAdress"],
        data: function () {

            return {
                inputTimeClicked : false ,
                indexInputAttente : null,
                // TODO A remplacer par des valeurs extraites du formulaire
                input: {
                    "shopId": null,
                    "etatDesStocks": null,
                    "ouvert": false,
                    /*"latitude": 1221,
                    "longitude": 1221,*/
                    "osmNodeId": null,
                    "tempsAttente": null,
                    "portDesGants": false,
                    "portDuMasque": false,
                    "respectDesDistances": false,
                    "nombreDeContribution" : 21,
                    "heureDerniereContribution" : null,
                    "dateDeContribution" : null,

                }
            }
        },

        computed:{
            classDistance: function () {
                if(this.input.respectDesDistances){
                    return "rule active";
                }
                return "rule";
            },
            classMask: function () {
                if(this.input.portDuMasque){
                    return "rule active";
                }
                return "rule";
            },
            classGloves: function () {
                if(this.input.portDesGants){
                    return "rule active";
                }
                return "rule";
            },
            classBtnContribution: function(){

                if(this.input.etatDesStocks != null && this.input.tempsAttente != null ){
                    return "contribute";
                }
                return "contributeDisabled";
            }
        },

        mounted: function(){
            this.input.shopId = this.shopId;
            console.warn(this.id)

        },

        methods: {
            onClose() {
                this.$router.push('/home');
            },

            setStock(state){
                this.input.etatDesStocks = state;
            },

            setIconState(icon){

                this.input[icon] = !this.input[icon];

            },

            setTimeAttente(temps , index){
                if(index == this.indexInputAttente){
                    this.input.tempsAttente = null;
                    this.indexInputAttente = null;
                }else{
                    this.input.tempsAttente = temps;
                    this.indexInputAttente = index;
                }

            },

            jsonToString(j){
                let json = {};
                for(let property in j){
                    json[`${property}`] = `${j[property]}`;
                }
                return json;
            },

            getCurrentDate (){
                let d = new Date();
                let day = (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
                let month = ((d.getMonth() + 1) < 10 ) ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
                return `${day}/${month}/${d.getFullYear()}`;
            },

            getCurrentTime(){
                let d = new Date();
                let hour = (d.getHours()<10) ? "0"+ d.getHours() : d.getHours();
                let mins = (d.getMinutes()<10) ? "0"+d.getMinutes(): d.getMinutes();
                return `${hour}:${mins}`;
            },

            contribute: function () {
                //this.input.lieuId = "" + md5(new Date().getTime() + this.input.latitude + this.input.longitude);
				this.input.osmNodeId = this.shopId;
				this.input.heureDerniereContribution = this.getCurrentTime();
                this.input.dateDeContribution = this.getCurrentDate();

                console.warn(this.jsonToString(this.input))
                console.warn(this.input)

                this.checkInput

                axios({
                    method: "POST",
                    "url": "https://qztfkr37s9.execute-api.eu-west-3.amazonaws.com/dev/store",
                    "data": this.input ,
                    "headers": {"content-type": "application/json"}
                }).then(result => {
                    //alert("Merci pour cette contribution : " + this.input.lieuId  + " " + result);
                    console.log(result);
                    alert("Merci pour votre contribution !");
                    this.onClose();
                }, error => {
                    console.error(error);
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .box-container {
        padding: 20px;
    }

    .title {
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 34px;
        text-transform: uppercase;
        color: #FEAD54;
    }

    .subtitle {
        text-align: left;
        margin-top: 20px;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        color: #FEAD54;
    }

    .message {
        margin-top: 15px;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        color: #000000;
    }

    .question {
        margin-top: 8px;
        text-align: left;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        color: #000000;
    }

    .shop-information {
        margin-top: 30px;
        height: 76px;
        background: #015468;
    }

    .shop-name {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 40px;
        color: #FFFFFF;
    }

    ul.how-long {
        margin-top: 14px;
        padding-left: 0px;
        list-style: none;
        display: flex;
        justify-content: space-around;

        & > li {
            padding-left: 10px;
            padding-right: 10px;
            display: inline;
            height: 60px;
            line-height: 60px !important;
            font-size: 12px;
            color: #079BAB;
            background: #ECECEC;
            border-radius: 6px;

            &.active {
                background: #079BAB;
                color: white;
                position: relative;

                &::before {
                    content: " ";
                    background-image: url(/images/leaves.svg);
                    position: absolute;
                    top: 30px;
                    left: -12px;
                    height: 33px;
                    width: 26px;
                }
            }
        }
    }

    ul.stock {
        margin-top: 14px;
        padding-left: 0px;
        list-style: none;
        display: flex;
        justify-content: space-between;

        & > li {
            font-size: 12px;
            color: #079BAB;
            background: #ECECEC;
            height: 60px;
            line-height: 60px !important;
            flex-grow: 1;

            &.active {
                background: #079BAB;
                color: white;
                position: relative;

                &::before {
                    content: " ";
                    background-image: url(/images/leaves.svg);
                    position: absolute;
                    top: 30px;
                    left: -12px;
                    height: 33px;
                    width: 26px;
                }
            }

            &:nth-child(1) {
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
                border-right: solid 1px #015468;
                border-left: solid 10px #079BAB;
            }

            &:nth-child(3) {
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
                border-left: solid 1px #015468;
            }
        }
    }

    .shop-address {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 36px;
        color: #FFFFFF;
    }

    .rule {
        border-right: 6px;
        background: #ECECEC;
        height: 63px;
        line-height: 63px;
        display: flex;
        justify-content: space-between;
        border-radius: 6px;
        cursor: pointer;

        & > .icon {
            margin-left: 15px;
            margin-top: 12px;
            width: 40px;
            height: 40px;
        }

        & > .checkbox {
            margin-right: 15px;
            margin-top: 20px;
            width: 22px;
            height: 22px;
            border-radius: 100%;
            background: white;
        }

        &.active {
            background: #079BAB;
            color: white;
            position: relative;

            &::before {
                content: " ";
                background-image: url(/images/leaves.svg);
                position: absolute;
                top: 30px;
                left: -12px;
                height: 33px;
                width: 26px;
            }

            & > .checkbox::before {
                content: " ";
                background: #FEAD54;
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 100%;
                margin-top: 6px;
                margin-left: -5px;
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
        cursor: pointer;
    }

    button.contributeDisabled {
        margin-top: 35px;
        background-color:dimgrey;
        border-radius: 6px;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        width: 100%;
        cursor : not-allowed;
    }

</style>
