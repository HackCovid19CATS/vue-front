<template>
    <div>
        <v-breakpoint>
            <div slot-scope="scope">
                <span v-if="scope.isSmall || scope.isMedium" style="font-size: 2rem">
                    <TutorialSmall :onClose="onClose"/>
                </span>
                <span v-if="scope.isLarge || scope.isXlarge">
                    <TutorialLarge :onClose="onClose"/>
                </span>
            </div>
        </v-breakpoint>
    </div>
</template>

<script>
    import { VBreakpoint } from 'vue-breakpoint-component';
    import TutorialSmall from "../components/TutorialSmall";
    import TutorialLarge from "../components/TutorialLarge";

    export default {
        name: "Tuto",
        components: {
            VBreakpoint,
            TutorialSmall,
            TutorialLarge
        },
        methods: {
            onClose: function () {
                this.$router.push('/home')
            },
        },
    }
</script>

<style lang="scss" scoped>
</style>