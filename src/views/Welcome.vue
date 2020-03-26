<template>
    <v-breakpoint>
        <div slot-scope="scope">
            <span v-if="scope.isSmall || scope.isMedium" style="font-size: 2rem">
                <WelcomeSmall :onContinue="onContinue"/>
            </span>

            <span v-if="scope.isLarge || scope.isXlarge">
                <WelcomeLarge :onContinue="onContinue"/>
            </span>
        </div>
    </v-breakpoint>
</template>

<script>
    //import { VBreakpoint } from 'vue-breakpoint-component';
    import { VBreakpoint } from '../components/VBreakpoint';
    import WelcomeSmall from "../components/WelcomeSmall";
    import WelcomeLarge from "../components/WelcomeLarge";

    export default {
        name: "Welcome",
        components: {
            WelcomeSmall,
            WelcomeLarge,
            VBreakpoint,
        },
        methods: {
            onContinue: function () {
                this.$router.push('/tuto')
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


    .lg-welcome-view {
        display: flex;
        flex-direction: row;
    }

    .lg-welcome-left {
        text-align: center;
        flex-grow: 1;
    }

    .lg-welcome-right {
        width: 600px;
    }

    .lg-welcome-image {
        width: 600px;
    }

    .lg-welcome-title {
        color: rgb(1, 84, 104);
        margin-top: 20%;
        font-size: 52px;
        font-style: normal;
        font-weight: normal;
        text-align: center;
    }

    .lg-welcome-message {
        color: rgb(1, 84, 104);
        font-size: 16px;
        font-style: normal;
        font-weight: normal;
        text-align: center;
        margin-top: 20%;
        margin-left: 10%;
        margin-right: 10%;
    }

    button.lg-contribute {
        margin-top: 40px;
        margin-left: auto;
        margin-right: auto;
        background-color: #079BAB;
        border-radius: 6px;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        width: calc(300px);
    }

</style>