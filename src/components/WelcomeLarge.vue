<template>
    <div class="lg-welcome-view">
        <div class="lg-welcome-left">
            <div class="lg-welcome-title">BIENVENUE</div>
            <div class="lg-welcome-message">
                Se renseigner sur le temps d’attente, l’état des stocks et le respect des règles de sécurité est primordiale avant de vous déplacer en magasin.<br />
                Aidez-nous à renseigner ces informations en partageant votre expérience !
            </div>
            <button class="lg-contribute" v-on:click="onContinue">Commencer</button>
        </div>
        <div class="lg-welcome-right">
            <WelcomePico class="lg-welcome-image"/>
        </div>
    </div>
</template>

<script>
    import WelcomePico from "../assets/welcome.svg";

    export default {
        name: "WelcomeLarge",
        props: {
            onContinue: { type: Function },
        },
        components: {
            WelcomePico
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';
    @import '../scss/infos.scss';

    .lg-welcome-view {
        display: flex;
        flex-direction: row;
        background-color: #015468;
        min-height: 100vh;
    }

    .lg-welcome-left {
        text-align: center;
        width: 50%;
        flex-grow: 1;
    }

    .lg-welcome-right {
        width: 50%;
        flex-grow: 1;
        margin-top: 170px;
    }

    .lg-welcome-image {
        width: 380px;
        margin: auto;
    }

    .lg-welcome-title {
        color: white;
        margin-top: 20%;
        font-size: 52px;
        font-style: normal;
        font-weight: normal;
        text-align: center;
    }

    .lg-welcome-message {
        color: white;
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