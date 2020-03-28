<template>
    <div class="welcome-view">
        <div class="welcome-container">
            <WelcomeLogo class="welcome-logo" />
            <div class="welcome-title">Tous solidaires pour des courses plus sûres !</div>
            <div class="welcome-subtitle">#restezchezvous</div>
            <div class="welcome-message">
                Vous souhaitez faire vos courses en toute sérénité ? Renseignez-vous sur les temps d'attente, l'état des stocks et le respect des règles de sécurité de vos commerces.
                <br /><br />
                Partagez ici votre expérience pour en faire bénéficier vos voisins de quartier !
            </div>
            <button class="welcome-button" v-on:click="onContinue">Commencer</button>
        </div>
    </div>
</template>

<script>
    import WelcomeLogo from '../assets/welcome-logo.svg';

    export default {
        name: "WelcomeSmall",
        props: {
            onContinue: { type: Function },
        },
        components: {
            WelcomeLogo,
        }
    }
</script>

<style lang="scss" scoped>
    .welcome-view {
        display: flex;
        background-color: rgb(1, 84, 104);
        min-height: 100vh;
    }

    .welcome-container {
        margin-top: auto;
        margin-bottom: auto;
    }

    .welcome-logo {
        width: 184px;
        height: 184px;
    }

    .welcome-title {
        color: white;
        font-size: 14px;
        margin-top: 38px;
    }

    .welcome-subtitle {
        color: white;
        font-size: 17px;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: 15px;
    }

    .welcome-message {
        color: white;
        font-size: 12px;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 36px;
    }

    button.welcome-button {
        margin-top: 93px;
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