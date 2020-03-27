<template>
    <div class="validation-view">
        <div class="bar">
            <button type="button" class="close" aria-label="Close" @click="onContinue()">x</button>
        </div>
        <div class="validation-title">Merci<br />pour votre contribution</div>
        <ThankYou class="picto" />
        <div class="validation-message">
            En quelques clics, vous venez d'apporter des informations précieuses à vos voisins. Plus nous serons nombreux, plus nous serons sereins lors de nos
            déplacements et plus nous ralentirons la propagation de l’épidémie.
        </div>
        <div class="validation-community">Faites grandir la communauté, partagez !</div>
        <button class="validation-return" v-on:click="onContinue">Retour à la carte</button>
    </div>
</template>

<script>
    import ThankYou from '../assets/thank_you.svg';

    export default {
        name: "ValidationLarge",
        components: {
            ThankYou,
        },
        methods: {
            onContinue: function () {
                this.$router.push('/home')
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .picto {
        margin-top: 40px;
        margin-bottom: 40px;
        width: 260px;
        height: 260px;
    }

    .validation-view {
        background-color: white;
        height: 100vh;
    }

    .validation-title {
        color: rgb(254, 173, 84);
        //fontFamily: "Montserrat-Regular",
        font-size: 36px;
        text-transform: uppercase;
    }

    .validation-message {
        color: rgb(1, 84, 104);
        font-size: 14px;
        width: 550px;
        margin-left: auto;
        margin-right: auto;
    }

    .validation-community {
        font-size: 16px;
        font-weight: bold;
        margin-top: 40px;
    }

    button.validation-return {
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