<template>
    <div>

        <v-breakpoint>
            <div slot-scope="scope">
                <span v-if="scope.isSmall || scope.isMedium" style="font-size: 2rem"> SMALL </span>
                <span v-if="scope.isLarge || scope.isXlarge">
                    <div class="welcome-view">
                        <div class="welcome-left">
                            <div class="welcome-title">BIENVENUE</div>
                            <div class="welcome-message">
                                Se renseigner sur le temps d’attente, l’état des stocks et le respect des règles de sécurité est primordiale avant de vous déplacer en magasin.<br />
                                Aidez-nous à renseigner ces informations en partageant votre expérience !
                            </div>
                            <button class="contribute" v-on:click="onSubmit">Commencer</button>
                        </div>
                        <div class="welcome-right">
                            <WelcomePico class="welcome-image"/>
                        </div>
                    </div>
                </span>
            </div>
        </v-breakpoint>


    </div>
</template>

<script>
    import { VBreakpoint } from 'vue-breakpoint-component';
    import WelcomePico from '../assets/welcome.svg';

    export default {
        name: "Test",
        components: {
            VBreakpoint,
            WelcomePico
        },
    }
</script>

<style lang="scss" scoped>
    .lg-welcome-view {
        display: flex;
        flex-direction: row;
    }

    .lg-welcome-left {
        text-align: center;
        flex-grow: 1;
    }

    .lg-welcome-right {
        width: 600px;
    }

    .lg-welcome-image {
        width: 600px;
    }

    .lg-welcome-title {
        color: rgb(1, 84, 104);
        margin-top: 20%;
        font-size: 52px;
        font-style: normal;
        font-weight: normal;
        text-align: center;
    }

    .lg-welcome-message {
        color: rgb(1, 84, 104);
        font-size: 16px;
        font-style: normal;
        font-weight: normal;
        text-align: center;
        margin-top: 20%;
        margin-left: 10%;
        margin-right: 10%;
    }

    button.contribute {
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