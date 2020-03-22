<template>

    <div style="background: url('@/assets/map-pin.jpg')">
        <user-coordinate></user-coordinate>
    </div>


    
</template>

<script>
    import UserCoordinate from "../components/UserCoordinate";

    export default {
        name: "Connexion",
        components: {
            UserCoordinate,
        },
    }
</script>

<style scoped>

</style>
