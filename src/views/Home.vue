<template>
    <v-breakpoint>
        <div slot-scope="scope">
            <span v-if="scope.isSmall || scope.isMedium" style="font-size: 2rem">
                <HomeSmall />
            </span>

            <span v-if="scope.isLarge || scope.isXlarge">
                <HomeLarge />
            </span>
        </div>
    </v-breakpoint>
</template>

<script>
    import { VBreakpoint } from '../components/VBreakpoint';
    import HomeSmall from "../components/HomeSmall";
    import HomeLarge from "../components/HomeLarge";

    export default {
        name: "NewHome",

        components: {
            VBreakpoint,
            HomeSmall,
            HomeLarge,
        },
    }
</script>

<style lang="scss" scoped>

</style>
