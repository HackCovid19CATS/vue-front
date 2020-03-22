<template>
    <div>
        <div class="bar">
            <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </div>
        <ThankYou class="picto" />
        <div class="title">
            Merci pour votre contribution !
        </div>
        <div class="message">
            Tous ensemble, nous pouvons nous entre aider à prendre les meilleures décisions et éviter les déplacements
        </div>
    </div>
</template>

<script>
    import ThankYou from '../assets/thank_you.svg';

    export default {
        name: "Validation",
        components: {
            ThankYou,
        },
    }
</script>

<style scoped>
    .bar {
        text-align: right;
    }

    .close {
        border: none;
        background-color: white;
        color: #FEAD54;
        font-size: 24px;
    }

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
        margin-top: 40px;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #000000;
    }
</style>