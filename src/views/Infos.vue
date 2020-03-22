<template>
    <div>
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
        components: {RespectingComponent, WhenYouGetHomeComponent, AtThePointOfSaleComponent, BeforeLeavingHomeComponent}
    }
</script>

<style lang="scss" scoped>
    @import '../scss/infos.scss';
</style>