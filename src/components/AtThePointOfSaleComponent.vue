<template>
    <div>
        <AtThePointOfSale class="picto" />
        <div class="directive">Sur le lieu de vente</div>
        <div class="bullets">
            <ul>
                <li>Respecter les distances</li>
                <li>Nettoyer régulièrement votre caddie</li>
                <li>Les gants ne sont pas nécessaires</li>
                <li>Privilégier les paiements sans contact</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import AtThePointOfSale from '../assets/at_the_point_of_sale.svg';

    export default {
        name: "AtThePointOfSaleComponent",
        components: {
            AtThePointOfSale,
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/infos.scss';
</style>