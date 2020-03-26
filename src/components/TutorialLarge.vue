<template>
    <div class="tuto-view">
        <div class="bar">
            <button type="button" class="close" aria-label="Close" @click="onClose()">x</button>
        </div>
        <div class="tuto-title">Les consignes</div>
        <div class="tuto-subtitle">pour faire ses courses</div>
        <div class="tuto-instructions">
            <BeforeLeavingHomeComponent />
            <AtThePointOfSaleComponent />
            <WhenYouGetHomeComponent />
        </div>

        <div class="tuto-message">
            En respectant ces quelques consignes vous limiterez les risques pour vous et pour le personnel présent dans les lieux de vente
        </div>
    </div>
</template>

<script>
    import BeforeLeavingHomeComponent from "./BeforeLeavingHomeComponent";
    import AtThePointOfSaleComponent from "./AtThePointOfSaleComponent";
    import WhenYouGetHomeComponent from "./WhenYouGetHomeComponent";

    export default {
        name: "TutorialLarge",
        props: {
            onClose: { type: Function },
        },
        components: {
            BeforeLeavingHomeComponent,
            AtThePointOfSaleComponent,
            WhenYouGetHomeComponent
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .tuto-view {
        background-color: white;
        height: 100vh;
    }
    .tuto-title {
        color: rgb(254, 173, 84);
        //fontFamily: "Montserrat-Regular",
        font-size: 48px;
    }

    .tuto-subtitle {
        color: rgb(7, 155, 171);
        font-size: 36px;
    }

    .tuto-instructions {
        display: flex;
        justify-content: space-around;
    }

    .tuto-message {
        color: rgb(1, 84, 104);
        font-size: 17px;
        width: 550px;
        margin-left: auto;
        margin-right: auto;
    }

</style>