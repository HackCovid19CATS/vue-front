<template>
    <div class="welcome-view">
        <WelcomeLogo class="welcome-logo" />
        <div class="welcome-title">Tous solidaires pour des courses plus sûres !</div>
        <div class="welcome-subtitle">#RESTEZCHEZVOUS</div>
        <div class="welcome-message">
            Vous souhaitez faire vos courses en toute sérénité ? Renseignez-vous sur les temps d'attente, l'état des stocks et le respect des règles de sécurité de vos commerces.
            <br /><br />
            Partagez ici votre expérience pour en faire bénéficier vos voisins de quartier !
        </div>
        <button class="welcome-button" v-on:click="onContinue">Commencer</button>
    </div>
</template>

<script>
    import WelcomeLogo from '../assets/welcome-logo.svg';

    export default {
        name: "WelcomeSmallNew",
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
        background-color: rgb(1, 84, 104);
        height: 100vh;
        flex: 1;
        align-items: center;
    }

    .welcome-logo {
        width: 184px;
        height: 184px;
        margin-top: 40px;
    }

    .welcome-title {
        color: white;
        //font-family: "Montserrat-Regular",
        font-size: 14px;
        text-align: center;
        margin-top: 38px;
    }

    .welcome-subtitle {
        color: white;
        //font-family: "Montserrat-Bold";
        font-size: 17px;
        font-weight: bold;
        text-align: center;
        margin-top: 15px;
    }

    .welcome-message {
        color: white;
        //font-family: "Montserrat-Regular",
        font-size: 12px;
        width: 320px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 77px;
    }

    button.welcome-button {
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