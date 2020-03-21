<template>

    <div class="container">

        <div class="row">

            <div class="col-lg-6 col-xs-12">
                <button class="btn btn-primary btn-block"> Localisez-moi !</button>
            </div>

            <div class="input-group col-lg-6 col-xs-12">
                <input class="form-control" placeholder="rentrez votre addresse exacte" v-model="userAddress">
                <div class="input-group-append">
                    <button class="btn btn-primary" @click="validAdress">Go!</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import "bootstrap";

    export default {
        name: "UserCoordinate",

        data: function(){
            return {
                userAddress: "",
            };
        },

        methods:{
            validAdress : function(){
                console.warn(this.userAddress);
            }
        }
    }
</script>

<style scoped>

</style>
