import axios from "axios";

export default {

    computed:{
        classDistance: function () {
            if(this.input.respectDesDistances){
                return "rule active";
            }
            return "rule";
        },
        classMask: function () {
            if(this.input.portDuMasque){
                return "rule active";
            }
            return "rule";
        },
        classGloves: function () {
            if(this.input.portDesGants){
                return "rule active";
            }
            return "rule";
        },
        classBtnContribution: function(){
            if(this.input.etatDesStocks != null && this.input.tempsAttente != null ){
                return "contribute";
            }
            return "contributeDisabled";
        }
    },

    methods: {
        onClose() {
            this.$router.push('/home');
        },

        setStock(state){
            this.input.etatDesStocks = state;
        },

        setIconState(icon){

            this.input[icon] = !this.input[icon];

        },

        setTimeAttente(temps , index){
            if(index === this.indexInputAttente){
                this.input.tempsAttente = null;
                this.indexInputAttente = null;
            }else{
                this.input.tempsAttente = temps;
                this.indexInputAttente = index;
            }

        },

        jsonToString(j){
            let json = {};
            for(let property in j){
                json[`${property}`] = `${j[property]}`;
            }
            return json;
        },

        contribute: function () {
            this.input.osmNodeId = this.shopId;

            console.warn(this.jsonToString(this.input))
            console.warn(this.input)

            axios({
                method: "POST",
                "url": "https://qztfkr37s9.execute-api.eu-west-3.amazonaws.com/dev/store",
                "data": this.input ,
                "headers": {"content-type": "application/json"}
            }).then(result => {
                console.log(result);
                this.$router.push('/thankyou');
            }, error => {
                console.error(error);
            });
        },
    }
};
