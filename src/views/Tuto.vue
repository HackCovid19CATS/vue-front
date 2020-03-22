<template>
    <div>
        <div class="bar">
            <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
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
        name: 'swiper-example-navigation',
        title: 'Navigation',
        components: {
            RespectingComponent,
            WhenYouGetHomeComponent,
            AtThePointOfSaleComponent,
            BeforeLeavingHomeComponent,
            Swiper,
            SwiperSlide,
        },
        data() {
            return {
                swiperOption: {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/infos.scss';

    .bar {
        text-align: right;
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

    .close {
        border: none;
        background-color: white;
        color: #FEAD54;
        font-size: 24px;
    }
</style>


