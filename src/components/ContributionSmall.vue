<template>
    <div>
        <div class="box box-container" v-if="orientation === 'portrait'">
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
                <div class="shop-address" v-if="shopAddress !== undefined">{{shopAddress}}</div>
                <div class="shop-address" v-else>Adresse non disponible</div>
            </div>
            <div class="subtitle">Temps d’attente</div>
            <div class="question">Combien de temps vous avez attendu ?</div>
            <ul class="how-long">
                <li :class="{active : indexInputAttente === 0}" @click="setTimeAttente(0 , 0)" style="cursor: pointer">0 min</li>
                <li :class="{active : indexInputAttente === 1}" @click="setTimeAttente(10 , 1)" style="cursor: pointer">10 min</li>
                <li :class="{active : indexInputAttente === 2}" @click="setTimeAttente(20 , 2)" style="cursor: pointer">20 min</li>
                <li :class="{active : indexInputAttente === 3}" @click="setTimeAttente(30 , 3)" style="cursor: pointer">30 min</li>
                <li :class="{active : indexInputAttente === 4}" @click="setTimeAttente(40 , 4)" style="cursor: pointer">+40 min</li>
            </ul>
            <div class="subtitle">Stock</div>
            <div class="question">Quel est l’état du stock du magasin ?</div>
            <ul class="stock">
                <li :class="{active : input.etatDesStocks === 'empty' || input.etatDesStocks === 'partly-filled' || input.etatDesStocks === 'well-filled' }"
                    @click="setStock('empty')" style="cursor: pointer">Vide</li>
                <li :class="{active : input.etatDesStocks === 'partly-filled' || input.etatDesStocks === 'well-filled' }"
                    @click="setStock('partly-filled')" style="cursor: pointer"> En partie rempli</li>
                <li :class="{active : input.etatDesStocks === 'well-filled'}"
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
        <SwitchToPortrait v-else />
    </div>
</template>

<script>
    import { MobileOrientation } from 'mobile-orientation';
    import SwitchToPortrait from "./SwitchToPortrait";
    import Distance from '../assets/distance.svg';
    import WearingMask from '../assets/mask.svg';
    import Gloves from '../assets/gloves.svg';
    import contributionMixin from "../mixins/contributionMixin";

    export default {
        name: "ContributionSmall",
        components: {
            SwitchToPortrait,
            Distance,
            WearingMask,
            Gloves,
        },
        props:["shopName" , "shopId" , "shopAddress"],

        mixins: [contributionMixin],

        data: function () {
            return {
                orientation: null,
                inputTimeClicked : false ,
                indexInputAttente : null,
                input: {
                    "etatDesStocks": null,
                    "ouvert": true,
                    "osmNodeId": null,
                    "tempsAttente": null,
                    "portDesGants": false,
                    "portDuMasque": false,
                    "respectDesDistances": false,
                }
            }
        },

        mounted: function(){
            const orientation = new MobileOrientation();
            this.orientation = orientation.state;
            orientation.on('portrait', (state) => {
                this.orientation = state;
            });
            orientation.on('landscape', (state) => {
                this.orientation = state
            });
        },
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
        font-size: 12px;
        color: $color-secondary;
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
