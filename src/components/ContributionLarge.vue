<template>
    <div>
        <div class="bar">
            <button type="button" class="close" aria-label="Close" @click="onClose()">x</button>
        </div>
        <div class="title">Contribution</div>
        <div class="subtitle">informer vos voisins et amis</div>
        <div class="message">
            Vous avez visité recemment ce magasin ? <br />
            Partagez votre expérience dès votre retour à la maison pour en informer les autres !
        </div>
        <div class="shop-information">
            <div class="shop-name">{{this.shopName}}</div>
            <div class="shop-address" v-if="this.shopAddress !== undefined">{{this.shopAddress}}xxx</div>
            <div class="shop-address" v-else>Adresse non disponible</div>
        </div>
        <div class="contribution">
            <div class="column">
                <div class="column-title">Temps d'attente</div>
                <div class="column-subtitle">Combien de temps avez vous attendu ?</div>

                <ul class="how-long">
                    <li :class="{active : indexInputAttente === 0}" @click="setTimeAttente(0 , 0)" style="cursor: pointer">0<br />min</li>
                    <li :class="{active : indexInputAttente === 1}" @click="setTimeAttente(10 , 1)" style="cursor: pointer">10<br />min</li>
                    <li :class="{active : indexInputAttente === 2}" @click="setTimeAttente(20 , 2)" style="cursor: pointer">20<br />min</li>
                    <li :class="{active : indexInputAttente === 3}" @click="setTimeAttente(30 , 3)" style="cursor: pointer">30<br />min</li>
                    <li :class="{active : indexInputAttente === 4}" @click="setTimeAttente(40 , 4)" style="cursor: pointer">+40<br />min</li>
                </ul>

            </div>
            <div class="column">
                <div class="column-title">Stock</div>
                <div class="column-subtitle">Quel était l'état des stocks du magasin ?</div>
                <ul class="stock">
                    <li :class="{active : input.etatDesStocks === 'empty' || input.etatDesStocks === 'partly-filled' || input.etatDesStocks === 'well-filled' }"
                        @click="setStock('empty')" style="cursor: pointer">Vide</li>
                    <li :class="{active : input.etatDesStocks === 'partly-filled' || input.etatDesStocks === 'well-filled' }"
                        @click="setStock('partly-filled')" style="cursor: pointer"> En partie rempli</li>
                    <li :class="{active : input.etatDesStocks === 'well-filled'}"
                        @click="setStock('well-filled')" style="cursor: pointer">Bien rempli</li>
                </ul>
            </div>
            <div class="column">
                <div class="column-title">Respect des règles</div>
                <div class="column-subtitle">L'établissement respecte-t'il les règles mise en place ?</div>
                <div class="rules-view">
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
                </div>
            </div>
        </div>
        <button :class="classBtnContribution" v-on:click="contribute">Contribuer</button>
    </div>
</template>

<script>
    import Distance from "../assets/distance.svg";
    import WearingMask from "../assets/mask.svg";
    import Gloves from "../assets/gloves.svg";
    import contributionMixin from "../mixins/contributionMixin";

    export default {
        name: "ContributionLarge",
        components: {
            Distance,
            WearingMask,
            Gloves,
        },
        props:["shopName" , "shopId" , "shopAddress"],

        mixins: [contributionMixin],

        data: function () {
            return {
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

    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .title {
        color: $color-primary;
        font-size: 48px;
        line-height: 57px;
        text-transform: uppercase;
    }

    .subtitle {
        color: $color-secondary;
        font-size: 36px;
        line-height: 43px;
    }

    .message {
        font-size: 12px;
        margin-top: 90px;
    }

    .address-box {
        background-color: $color-info;
        height: 76px;
        margin-top: 90px;
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

    .shop-address {
        color: white;
        font-size: 12px;
        line-height: 15px;
    }

    .contribution {
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: row;
    }

    .column {
        height: 50px;
        width: 33.33%;
    }

    .column-title {
        text-align: left;
        margin-top: 40px;
        padding-left: 30px;
        font-size: 16px;
        line-height: 19px;
        color: $color-primary;
    }

    .column-subtitle {
        text-align: left;
        margin-top: 10px;
        padding-left: 30px;
        font-size: 12px;
        line-height: 15px;

    }

    ul.how-long {
        margin-top: 40px;
        padding-left: 20px;
        padding-right: 20px;
        list-style: none;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        & > li {
            margin-bottom: 20px;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 27px;
            display: inline;
            height: 88px;
            width: 84px;
            line-height: 17px;
            font-size: 14px;
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
                    left: -12px;
                    top: 36px;
                    height: 53px;
                    width: 42px;
                }
            }
        }
    }

    ul.stock {
        margin-top: 40px;
        padding-left: 30px;
        padding-right: 30px;
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

    .rules-view {
        margin-top: 40px;
    };

    .rule {
        border-right: 6px;
        background: #ECECEC;
        height: 63px;
        line-height: 63px;
        margin-left: 30px;
        margin-right: 30px;
        text-align: left;
        color: $color-secondary;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        border-radius: 6px;
        cursor: pointer;

        & > .icon {
            margin-left: 15px;
            margin-right: 15px;
            margin-top: 12px;
            width: 40px;
            height: 40px;
        }

        & > .checkbox {
            margin-right: 15px;
            margin-top: 22px;
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
                top: 7px;
                left: -20px;
                height: 56px;
                width: 44px;
            }

            & > .checkbox::before {
                content: " ";
                background: #FEAD54;
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 100%;
                margin-top: 6px;
                margin-left: 6px;
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
        font-size: 16px;
        width: 320px;
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
        font-size: 16px;
        width: 320px;
        cursor : not-allowed;
    }

</style>
