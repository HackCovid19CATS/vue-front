<template>
    <div>
        <v-breakpoint>
            <div slot-scope="scope">
                <span v-if="scope.isSmall || scope.isMedium" style="font-size: 2rem">
                    <ValidationSmall :onClose="onClose"/>
                </span>
                <span v-if="scope.isLarge || scope.isXlarge">
                    <ValidationLarge :onClose="onClose"/>
                </span>
            </div>
        </v-breakpoint>
    </div>
</template>

<script>
    import { VBreakpoint } from 'vue-breakpoint-component';
    import ValidationSmall from "../components/ValidationSmall";
    import ValidationLarge from "../components/ValidationLarge";

    export default {
        name: "Validation",
        components: {
            VBreakpoint,
            ValidationSmall,
            ValidationLarge,
        },
        mounted: function() {
            this.$gtag.pageview({
                page_path: '/validation',
                page_title: "Validation"
            });
        },
        methods: {
            onClose() {
                this.$router.push('/home');
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .picto {
        margin-top: 40px;
        margin-bottom: 40px;
        width: 260px;
        height: 260px;
    }

    .title {
        margin-top: 40px;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        color: #FEAD54;
    }

    .message {
        width: 80%;
        margin-top: 40px;
        margin-left: auto;
        margin-right: auto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #000000;
    }

    .community{
        width: 80%;
        margin-top: 40px;
        margin-left: auto;
        margin-right: auto;
        font-size: 16px;
        color: #015468;
        font-weight: bold;
    }
</style>