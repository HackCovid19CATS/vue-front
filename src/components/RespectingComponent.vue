<template>
    <div>
        <Respecting class="picto" />
        <div class="message">En respectant ces quelques consignes vous limiterez les risques pour vous et pour le personnel présent dans les lieux de vente</div>
    </div>
</template>

<script>
    import Respecting from '../assets/respecting.svg';

    export default {
        name: "RespectingComponent",
        components: {
            Respecting,
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/infos.scss';
</style>