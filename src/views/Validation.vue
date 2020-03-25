<template>
    <div class="box">
        <div class="bar">
            <button type="button" class="close" aria-label="Close" @click="onClose()">x</button>
        </div>
        <ThankYou class="picto" />
        <div class="title">
            Merci pour votre contribution !
        </div>
        <div class="message">
            En quelques clics, vous venez d'apporter des informations précieuses à vos voisins. Plus nous serons nombreux, plus nous serons sereins lors de nos
            déplacements et plus nous ralentirons la propagation de l’épidémie.
        </div>
        <div class="community">Faites grandir la communauté, partagez !</div>
    </div>
</template>

<script>
    import ThankYou from '../assets/thank_you.svg';

    export default {
        name: "Validation",
        components: {
            ThankYou,
        },
        mounted: function() {
            this.$gtag.pageview({
                page_path: '/validation',
                page_title: "Validation"
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

    .picto {
        margin-top: 40px;
        margin-bottom: 40px;
        width: 260px;
        height: 260px;
    }

    .title {
        margin-top: 40px;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        color: #FEAD54;
    }

    .message {
        width: 80%;
        margin-top: 40px;
        margin-left: auto;
        margin-right: auto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #000000;
    }

    .community{
        width: 80%;
        margin-top: 40px;
        margin-left: auto;
        margin-right: auto;
        font-size: 16px;
        color: #015468;
        font-weight: bold;
    }
</style>