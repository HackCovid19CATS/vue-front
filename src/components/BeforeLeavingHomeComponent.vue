<template>
    <div>
        <BeforeLeavingHome class="picto" />
        <div class="directive">Avant de sortir de chez soi</div>
        <div class="bullets">
            <ul>
                <li>Se munir de son autorisation datée et signée</li>
                <li>Privilégier les sorties seul</li>
                <li>Choisir un commerce à proximité</li>
                <li>Emporter ses propres sacs</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import BeforeLeavingHome from '../assets/before_leaving_home.svg';

    export default {
        name: "BeforeLeavingHomeComponent",
        components: {
            BeforeLeavingHome,
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/infos.scss';
</style>