

<template>

    <div class="row">

        <div class="jumbotron">
            Bienvenue sur la subpage !
        </div>

        <div v-if="$route.params.mess">
            {{$route.params.mess}}
        </div>

    </div>
    
</template>

<script>
    import 'bootstrap';

    export default {
        name: "Subpage"
    }
</script>

<style scoped>

</style>
