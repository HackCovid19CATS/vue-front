<template>
    <div class="tuto-view">
        <div class="bar">
            <button type="button" class="close" aria-label="Close" @click="onClose()">x</button>
        </div>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide>
                <div class="title">Les consignes</div>
                <div class="subtitle">pour faire ses courses</div>
                <BeforeLeavingHomeComponent />
            </swiper-slide>
            <swiper-slide>
                <div class="title">Les consignes</div>
                <div class="subtitle">pour faire ses courses</div>
                <AtThePointOfSaleComponent />
            </swiper-slide>
            <swiper-slide>
                <div class="title">Les consignes</div>
                <div class="subtitle">pour faire ses courses</div>
                <WhenYouGetHomeComponent />
            </swiper-slide>
            <swiper-slide>
                <div class="title">Les consignes</div>
                <div class="subtitle">pour faire ses courses</div>
                <RespectingComponent />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import BeforeLeavingHomeComponent from "../components/BeforeLeavingHomeComponent";
    import AtThePointOfSaleComponent from "../components/AtThePointOfSaleComponent";
    import WhenYouGetHomeComponent from "../components/WhenYouGetHomeComponent";
    import RespectingComponent from "../components/RespectingComponent";

    export default {
        name: 'TutorialSmall',
        props: {
            onClose: { type: Function },
        },
        components: {
            RespectingComponent,
            WhenYouGetHomeComponent,
            AtThePointOfSaleComponent,
            BeforeLeavingHomeComponent,
            Swiper,
            SwiperSlide,
        },
        mounted: function() {
            this.$gtag.pageview({
                page_path: '/tuto',
                page_title: "Tutorial"
            });
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
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';
    @import '../scss/infos.scss';

    .tuto-view {
        width: 100%;
        height: 100vh;
        background-color: white;
    }

    .swiper {
        width: 100%;
    }

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

    .swiper-button-prev,
    .swiper-button-next {
        background-color: #079BAB;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        opacity: .3;
    }

    .swiper-button-prev:hover,
    .swiper-button-next:hover {
        opacity: .9;
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
        color: white;
        font-size: 24px;
    }

    .swiper-pagination-bullet {
        background: #079BAB !important;
    }

</style>


