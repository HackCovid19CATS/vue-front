<template>
    <vue100vh :css="{height: '100rvh'}" class="lg-welcome-view">
        <div class="lg-welcome-left">
            <div class="lg-welcome-slogan">Tous solidaires pour des courses plus sûres !</div>
            <div class="lg-welcome-title">#restezchezvous</div>
            <div class="lg-welcome-message">
                <p>Vous souhaitez faire vos courses en toute sérénité ? Renseignez-vous sur les temps d'attente, l'état des stocks et le respect des règles de sécurité de vos commerces.</p>
                <p>Partagez ici votre expérience pour en faire bénéficier vos voisins de quartier !</p>
            </div>
            <button class="lg-welcome-start" v-on:click="onContinue">Commencer</button>
        </div>
        <div class="lg-welcome-right">
            <WelcomePico class="lg-welcome-image"/>
        </div>
    </vue100vh>
</template>

<script>
    import vue100vh from 'vue-100vh'
    import WelcomePico from "../assets/welcome.svg";

    export default {
        name: "WelcomeLarge",
        props: {
            onContinue: { type: Function },
        },
        components: {
            vue100vh,
            WelcomePico
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .lg-welcome-view {
        display: flex;
        flex-direction: row;
        background-color: #015468;
    }

    .lg-welcome-left {
        margin-top: auto;
        margin-bottom: auto;
        text-align: center;
        width: 50%;
        flex-grow: 1;
    }

    .lg-welcome-slogan {
        color: white;
        font-size: 16px;
        line-height: 19px;
    }

    .lg-welcome-title {
        color: white;
        font-size: 24px;
        line-height: 29px;
        margin-top: 38px;
    }

    .lg-welcome-message {
        color: white;
        font-size: 16px;
        margin-top: 33px;
        margin-left: 10%;
    }

    button.lg-welcome-start {
        width: 340px;
        height: 42px;
        margin-top: 91px;
        background-color: #079BAB;
        border-radius: 6px;
        border: none;
        color: white;
        font-size: 16px;
        line-height: 42px;
    }

    .lg-welcome-right {
        width: 50%;
        flex-grow: 1;
        margin-top: auto;
        margin-bottom: auto;
    }

    .lg-welcome-image {
        width: 386px;
        margin: auto;
    }
</style>