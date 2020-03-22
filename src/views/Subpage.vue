

<template>

    <div class="container">

        <div class="row">

            <div class="jumbotron col-12">
                Bienvenue sur la subpage !
            </div>

            <div v-if="$route.params.mess">
                {{$route.params.mess}}
            </div>

        </div>

    </div>


    
</template>

<script>

    export default {
        name: "Subpage"
    }
</script>

<style>

    @import "/node_modules/bootstrap/scss/bootstrap.scss";

</style>
