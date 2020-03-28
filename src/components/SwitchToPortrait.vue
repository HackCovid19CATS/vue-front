<template>
    <vue100vh :css="{height: '100rvh'}" class="switch-view">
        <WelcomeLogo class="switch-logo" />
        <div class="switch-title">#restezchezvous</div>
        <div class="message">
            Pour un meilleur confort d'utilisation,<br />
            basculez votre équipement en mode portrait
        </div>
    </vue100vh>
</template>

<script>
    import vue100vh from 'vue-100vh'
    import WelcomeLogo from '../assets/welcome-logo.svg';

    export default {
        name: "SwitchToPortrait",
        components: {
            vue100vh,
            WelcomeLogo,
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .switch-view {
        background-color: $color-info;
    }

    .switch-logo {
        margin-top: 20px;
        width: 120px;
        height: 120px;
    }

    .switch-title {
        color: white;
        font-size: 17px;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: 15px;
    }

    .message {
        margin-top: 15px;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        color: white;
    }

</style>