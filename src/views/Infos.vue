<template>
    <div class="box">
        <div class="bar infos">
            <button type="button" class="close" aria-label="Close" @click="onClose()">x</button>
        </div>
        <div class="title">Les consignes</div>
        <div class="subtitle">pour faire ses courses</div>
        <BeforeLeavingHomeComponent />
        <AtThePointOfSaleComponent />
        <WhenYouGetHomeComponent />
        <RespectingComponent />
    </div>
</template>

<script>
    import BeforeLeavingHomeComponent from "../components/BeforeLeavingHomeComponent";
    import AtThePointOfSaleComponent from "../components/AtThePointOfSaleComponent";
    import WhenYouGetHomeComponent from "../components/WhenYouGetHomeComponent";
    import RespectingComponent from "../components/RespectingComponent";
    export default {
        name: "Infos",
        components: {RespectingComponent, WhenYouGetHomeComponent, AtThePointOfSaleComponent, BeforeLeavingHomeComponent},
        mounted: function() {
            this.$gtag.pageview({
                page_path: '/infos',
                page_title: "Informations"
            });
        },
        methods: {
            onClose() {
                this.$router.push('/home');
            },
        },
    }

</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';
    @import '../scss/infos.scss';

    .infos {
        margin-bottom: 40px;
    }
</style>
