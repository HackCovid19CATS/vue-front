<template>
    <v-breakpoint>
        <div slot-scope="scope">
            <span v-if="scope.isSmall || scope.isMedium" style="font-size: 2rem">
                <ContributionSmall
                        :shopId="shopId"
                        :shopName="shopName"
                        :shopAddress="shopAddress"
                />
            </span>

            <span v-if="scope.isLarge || scope.isXlarge">
                <ContributionLarge
                        :shopId="shopId"
                        :shopName="shopName"
                        :shopAddress="shopAddress"
                />
            </span>
        </div>
    </v-breakpoint>
</template>

<script>
    import { VBreakpoint } from '../components/VBreakpoint';
    import ContributionSmall from "../components/ContributionSmall";
    import ContributionLarge from "../components/ContributionLarge";

    export default {
        name: "Contribution",
        components: {
            VBreakpoint,
            ContributionSmall,
            ContributionLarge,
        },
        props:["shopId", "shopName" , "shopAddress"],

        mounted: function(){
            this.$gtag.pageview({
                page_path: '/contribution',
                page_title: "Contribution"
            });
        },

        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .box-container {
        padding: 20px;
    }

    .title {
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 34px;
        text-transform: uppercase;
        color: #FEAD54;
    }

    .subtitle {
        text-align: left;
        margin-top: 20px;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        color: #FEAD54;
    }

    .message {
        margin-top: 15px;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        color: #000000;
    }

    .question {
        margin-top: 8px;
        text-align: left;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        color: #000000;
    }

    .shop-information {
        margin-top: 30px;
        height: 76px;
        background: #015468;
    }

    .shop-name {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 40px;
        color: #FFFFFF;
    }

    ul.how-long {
        margin-top: 14px;
        padding-left: 0px;
        list-style: none;
        display: flex;
        justify-content: space-around;

        & > li {
            padding-left: 10px;
            padding-right: 10px;
            display: inline;
            height: 60px;
            line-height: 60px !important;
            font-size: 12px;
            color: #079BAB;
            background: #ECECEC;
            border-radius: 6px;

            &.active {
                background: #079BAB;
                color: white;
                position: relative;

                &::before {
                    content: " ";
                    background-image: url(/images/leaves.svg);
                    position: absolute;
                    top: 30px;
                    left: -12px;
                    height: 33px;
                    width: 26px;
                }
            }
        }
    }

    ul.stock {
        margin-top: 14px;
        padding-left: 0px;
        list-style: none;
        display: flex;
        justify-content: space-between;

        & > li {
            font-size: 12px;
            color: #079BAB;
            background: #ECECEC;
            height: 60px;
            line-height: 60px !important;
            flex-grow: 1;

            &.active {
                background: #079BAB;
                color: white;
                position: relative;

                &::before {
                    content: " ";
                    background-image: url(/images/leaves.svg);
                    position: absolute;
                    top: 30px;
                    left: -12px;
                    height: 33px;
                    width: 26px;
                }
            }

            &:nth-child(1) {
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
                border-right: solid 1px #015468;
                border-left: solid 10px #079BAB;
            }

            &:nth-child(3) {
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
                border-left: solid 1px #015468;
            }
        }
    }

    .shop-address {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 36px;
        color: #FFFFFF;
    }

    .rule {
        border-right: 6px;
        background: #ECECEC;
        height: 63px;
        line-height: 63px;
        display: flex;
        justify-content: space-between;
        border-radius: 6px;
        cursor: pointer;

        & > .icon {
            margin-left: 15px;
            margin-top: 12px;
            width: 40px;
            height: 40px;
        }

        & > .checkbox {
            margin-right: 15px;
            margin-top: 20px;
            width: 22px;
            height: 22px;
            border-radius: 100%;
            background: white;
        }

        &.active {
            background: #079BAB;
            color: white;
            position: relative;

            &::before {
                content: " ";
                background-image: url(/images/leaves.svg);
                position: absolute;
                top: 30px;
                left: -12px;
                height: 33px;
                width: 26px;
            }

            & > .checkbox::before {
                content: " ";
                background: #FEAD54;
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 100%;
                margin-top: 6px;
                margin-left: -5px;
            }
        }
    }

    button.contribute {
        margin-top: 35px;
        background-color: #079BAB;
        border-radius: 6px;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        width: 100%;
        cursor: pointer;
    }

    button.contributeDisabled {
        margin-top: 35px;
        background-color:dimgrey;
        border-radius: 6px;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        width: 100%;
        cursor : not-allowed;
    }

</style>
