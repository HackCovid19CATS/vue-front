<template>
    <div class="box">
        <div class="bar">
            <button type="button" class="close" aria-label="Close" @click="onContinue()">x</button>
        </div>
        <div class="title">Mentions légales</div>
        <div class="message">
            <strong>CAcôté</strong> est une web application collaborative d'assistance de shopping sécurisé basée sur la géolocalisation et couplée à une cartographie des magasins de proximité.<br />
            Imaginée pour sécuriser les déplacements dérogatoires des français en période de confinement, toutes les informations sur les magasins (temps d’attente, fréquentation, respects des règles de sécurité et états des stocks) sont mises à jour en temps réel grâce à la production participative.<br />
            <strong>CAcôté</strong> est une initiative solidaire face à l’épidémie du Covid 19 afin de protéger les français.<br />
            Cette web application est lancée par une équipe de collaborateurs volontaires et mobilisés de <strong>Crédit Agricole Technologies et Services</strong> filiale IT des 39 Caisses régionales. Imaginée en moins de deux jours en mode agile elle sera enrichie en continu afin de permettre ensemble de faire ses courses en toute sécurité.
        </div>
    </div>
</template>

<script>
    export default {
        name: "LegalNotice"
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .title {
        margin-top: 20px;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        color: #FEAD54;
    }

    .message {
        width: 90%;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #000000;
    }
</style>