<template>
    <div class="box welcome">
        <swiper class="swiper mi-height" :options="swiperOption">
            <swiper-slide>
                <BeforeLeavingHome class="welcome-picto"/>
                <div class="title">
                    <div class="line1">Quelques recommandations</div>
                    <div class="line2">avant de sortir faire vos courses</div>
                </div>
                <div class="bullets">
                    <ul>
                        <li>Se munir de son autorisation datée et signée</li>
                        <li>Privilégier les sorties seul</li>
                        <li>Choisir un commerce à proximité</li>
                        <li>Emporter ses propres sacs</li>
                    </ul>
                </div>
            </swiper-slide>
            <swiper-slide>
                <AtThePointOfSale class="welcome-picto"/>
                <div class="title">
                    <div class="line1">Quelques recommandations</div>
                    <div class="line2">sur le lieu de vente</div>
                </div>
                <div class="bullets">
                    <ul>
                        <li>Respecter les distances</li>
                        <li>Nettoyer régulièrement votre caddie</li>
                        <li>Les gants ne sont pas nécessaires</li>
                        <li>Privilégier les paiements sans contact</li>
                    </ul>
                </div>
            </swiper-slide>
            <swiper-slide>
                <WhenYouGetHome class="welcome-picto"/>
                <div class="title">
                    <div class="line1">Quelques recommandations</div>
                    <div class="line2">en rentrant chez vous</div>
                </div>
                <div class="bullets">
                    <ul>
                        <li>Lavez-vous les mains</li>
                        <li>Désinfectez les poignets de votre chariot</li>
                        <li>Posez les paquets par terre pendant 3 à 4 h</li>
                        <li>Enlevez les emballages et lavez les fruits et légumes</li>
                    </ul>
                </div>
            </swiper-slide>
            <swiper-slide>
                <Respecting class="welcome-picto"/>
                <div class="respecting">
                    En respectant ces quelques consignes vous limiterez les risques<br />pour vous et pour le personnel présent dans les lieux de vente
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <div class="welcome-box">
            <div class="bar">
            </div>
            <div class="welcome-title">Bienvenue</div>
            <div class="welcome-message">
                Se renseigner sur le temps d’attente, l’état des stocks et le respect des règles de sécurité est primordial avant de vous déplacer en magasin.
                Aidez-nous à renseigner ces informations en partageant votre expérience !
            </div>
            <button class="contribute" v-on:click="onSubmit">Commencer</button>
        </div>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import BeforeLeavingHome from '../assets/before_leaving_home.svg';
    import AtThePointOfSale from '../assets/at_the_point_of_sale.svg';
    import WhenYouGetHome from '../assets/when_you_get_home.svg';
    import Respecting from '../assets/respecting.svg';

    export default {
        name: "Welcome",
        components: {
            BeforeLeavingHome,
            AtThePointOfSale,
            WhenYouGetHome,
            Respecting,
            Swiper,
            SwiperSlide,
        },
        methods: {
            onSubmit: function () {
                this.$router.push('/home')
            },
        },
        data() {
            return {
                swiperOption: {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        renderBullet(index, className) {
                            return `<span class="${className} swiper-pagination-bullet-custom"></span>`
                        },
                        //dynamicBullets: true,
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';
    @import '../scss/infos.scss';

    .swiper {
        /deep/
        .swiper-pagination-bullet-custom {
            $size: 10px;
            width: $size !important;
            height: $size !important;
            line-height: $size !important;
            text-align: center;
            opacity: 0.7;
            background: rgba(#ECECEC, 0.8);
            transition: all 200ms;

            &:hover {
                opacity: 1;
            }

            &.swiper-pagination-bullet-active {
                opacity: 1;
                color: white;
                background: #079BAB;
            }
        }
    }

    .welcome {
        padding-top : 10px;
    }

    .mi-height {
        height: 50vh;
    }

    .welcome-picto {
        height: 60px;
        width: 60px;
        margin-bottom: 20px;
    }

    .title {
        margin-left: 20px;
        display: inline-block;

        & .line1 {
            text-align: left;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 22px;
            color: #015468;
        }

        & .line2 {
            text-align: left;
            font-style: normal;
            font-weight: bold;
            font-size: 12px;
            line-height: 22px;
            color: #FEAD54;
        }
    }

    .swiper-button-prev,
    .swiper-button-next {
        width: 40px;
        height: 40px;
        border-radius: 100%;

        &::after {
            color: #079BAB !important;
            opacity: .6;
        }
    }


    .swiper-button-prev::after,
    .swiper-button-next::after {
        color: white;
        font-size: 24px;
    }

    .swiper-button-prev:hover::after,
    .swiper-button-next:hover::after {
        opacity: 0.9;
    }

    .respecting {
        width: calc(100% - 100px);
        margin: auto;
    }

    .welcome-box {
        background-color: #015468;
        height: 50vh;
        color: white;
    }

    .welcome-title {
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 34px;
        text-align: center;
    }

    .welcome-message {
        margin-top: 10px;
        padding-left: 40px;
        padding-right: 40px;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 22px;
    }

    .welcome-close {
        background-color: #015468;
        border: none;
        color: white;
        font-size: 24px;
    }

    button.contribute {
        margin-top: 40px;
        margin-left: 40px;
        margin-right: 40px;
        margin-bottom: 35px;
        background-color: #079BAB;
        border-radius: 6px;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        width: calc(100% - 80px);
    }

    // Small devices (landscape phones, 576px and up)
    @media (min-width: $small-device) {

        .welcome {
            padding-top : 20px;
        }

        .welcome-picto {
            height: 120px;
            width: 120px;
        }

        .picto {
            height: 100px;
            width: 100px;
        }

        .title {
            margin-left: 20px;

            & .line1 {
                font-size: 18px;
                line-height: 22px;
            }

            & .line2 {
                font-size: 16px;
                line-height: 22px;
            }
        }

        .welcome-title {
            font-size: 28px;
            line-height: 34px;
            margin-top: 40px;
        }

        .welcome-message {
            margin-top: 40px;
            font-size: 16px;
        }

        button.contribute {
            margin-top: 40px;
            font-size: 20px;
        }

        .respecting {
            margin-top: 40px;
            width: calc(100% - 160px);
            font-size: 24px;
        }

        .swiper {
            /deep/
            .swiper-pagination-bullet-custom {
                $size: 20px;
                width: $size !important;
                height: $size !important;
                line-height: $size !important;
            }
        }

    }

    // Medium devices (tablets, 768px)
    @media (min-width: $medium-device) {
        .welcome {
            padding-top : 40px;
        }

        .title {
            & .line1 {
                font-size: 28px;
                line-height: 32px;
            }

            & .line2 {
                font-size: 26px;
                line-height: 30px;
            }
        }

        .welcome-title {
            font-size: 42px;
            line-height: 42px;
            margin-top: 60px;
        }

        .welcome-message {
            margin-top: 40px;
            font-size: 24px;
            line-height: 28px;
        }

        button.contribute {
            margin-top: 60px;
            font-size: 28px;
        }

    }
</style>