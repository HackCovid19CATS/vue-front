<template>
    <div>
        <WhenYouGetHome class="picto" />
        <div class="directive">En rentrant chez vous</div>
        <div class="bullets">
            <ul>
                <li>Lavez-vous les mains</li>
                <li>Désinfectez les poignets de votre chariot, sac, cabas</li>
                <li>Posez les paquets par terre pendant 3 à 4 h</li>
                <li>Enlevez les emballages et lavez les fruits et légumes</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import WhenYouGetHome from '../assets/when_you_get_home.svg';

    export default {
        name: "WhenYouGetHomeComponent",
        components: {
            WhenYouGetHome,
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/infos.scss';
</style>