<template>

	<!--
    <div class="visible" style="position: absolute; left: 50%;" v-if="value">
		<div class="detail" style="position: relative; left: -50%;">
	-->
		<div>
			<div class="bar" v-if="showClose == '1'">
				<button type="button" class="close" style="margin-right: 0px" @click="maskBox">X</button>
			</div>
			<div class="store-contribution" v-if="storeNumberOfContribution > 0">{{storeDateLastContribution}} {{storeTimeOfLastContribution}} - {{storeNumberOfContribution}} <span v-if="storeNumberOfContribution == 1">contribution</span><span v-else>contributions</span></div>
			<!--
			<div class="store-contribution" v-else >Aucune contribution</div>
			-->
			<div class="store-name">{{storeName}}</div>
			<div class="store-address" v-if="storeAddress !== ''">{{storeAddress}}</div>
			<a :href="linkOSM" target="_blank" v-if="showLink" style="font-size: 8px">Lien vers OpenStreetMap</a>
			<div class="store-phone" v-if="storePhone !== ''">
				<a :href="storePhone" class="call">Appeler</a>
			</div>
			<!-- Commenté en attendant un avis métier sur l'affichage de cet indicateur -->
			<!-- <div class="store-status"> -->
				<!-- <div class="store-status-open" v-if="storeStatus === 'true'">Ouvert :)</div> -->
				<!-- <div class="store-status-close" v-if="storeStatus === 'false'">Fermé :(</div> -->
				<!-- <div class="store-status-null" v-else>Inconnu</div> -->
			<!-- </div> -->
			<div class="store-contribution" v-if="storeNumberOfContribution > 0">
				<div class="waiting">
					<div class="detail-title">Temps d’attente à l'extérieur</div>
					<div>
						<Clock class="waiting-picto" />
						<div class="waiting-value" v-if="storeWaiting >= 0">{{storeWaiting}} min en moyenne</div>
						<div class="waiting-value" v-else>Non communiqué</div>

					</div>
				</div>
				<div class="inventory">
					<div class="detail-title">Etat des stocks</div>
					<div class="empty" :class="{ active: storeStocks === 'empty' || storeStocks === 'partly-filled' }">Vide</div>
					<div class="partly-filled" :class="{ active: storeStocks === 'partly-filled' || storeStocks === 'well-filled'}">En partie<br />rempli</div>
					<div class="well-filled" :class="{ active: storeStocks === 'well-filled' }">Bien<br />rempli</div>
				</div>
				<div class="rules">
					<div class="detail-title">Respect des règles</div>
					<div class="rules-icon" :class="{ active: storeDistance === true }">
						<IconDistance v-if="storeDistance === true" class="rules-icon" />
						<IconDistanceKo v-else class="rules-icon" />
					</div>
					<div class="rules-icon" :class="{ active: storeMasks === true }">
						<IconMask v-if="storeMasks === true" class="rules-icon" />
						<IconMaskKo v-else class="rules-icon" />
					</div>
					<div class="rules-icon" :class="{ active: storeGloves === true }">
						<IconGloves v-if="storeGloves === true" class="rules-icon" />
						<IconGlovesKo v-else class="rules-icon" />
					</div>
				</div>
			</div>
			<div class="store-no-contribution" v-else >
				Soyez le premier à contribuer :)
			</div>
			<button class="contribute" v-on:click="onContribute"><span>Contribuer</span></button>
		</div>
</template>

<script>

    import Clock from '../assets/clock.svg';
    import IconDistance from '../assets/icon_distance.svg';
    import IconDistanceKo from '../assets/icon_distance_ko.svg';
    import IconMask from '../assets/icon_mask.svg';
    import IconMaskKo from '../assets/icon_mask_ko.svg';
    import IconGloves from '../assets/icon_gloves.svg';
    import IconGlovesKo from '../assets/icon_gloves_ko.svg';

    export default {
        name: "BoxDetailShop",
        components : {
            Clock,
            IconDistance,
			IconDistanceKo,
            IconMask,
			IconMaskKo,
            IconGloves,
			IconGlovesKo,
        },

		data : function(){
			return {
				showLink: false,
				//showBox: this.value,
			}
		},

        props:[
			"showClose",
			"storeName",
			"storeAddress",
			"storePhone",
			"storeOpeningHours",
			"storeOsmId",
			"linkOSM",
			"storeStocks",
			"storeStatus",
			"storeWaiting",
			"storeGloves",
			"storeMasks",
			"storeDistance",
			"storeNumberOfContribution" ,
			"storeTimeOfLastContribution",
			"storeDateLastContribution",
			//"value"
		],

		methods: {
			onContribute: function () {
				if (this.storeName === '') {
					this.$router.push(`/contribution/${this.storeOsmId}`);
				} else if (this.storeAddress === '') {
					this.$router.push(`/contribution/${this.storeOsmId}/${this.storeName.replace('/', '-')}`);
				} else {
					this.$router.push(`/contribution/${this.storeOsmId}/${this.storeName}/${this.storeAddress.replace('/', '-')}`);
				}
			},

			maskBox: function () {
				this.$emit('boxclosed' , false);
			},
		},

		mounted() {
			console.log(window.location.hostname);
			this.showLink = (window.location.hostname === 'localhost') || (window.location.hostname === '127.0.0.1');
		}
    }
</script>

<style lang="scss" scoped>
    @import '../scss/commun.scss';

    .header {
        height: 68px;
        background-color: white;
        display: flex;
    }

    .footer {
        width: 100%;
        height: 68px;
        background-color: white;
        position: absolute;
        bottom: 0;
    }

    .map {
        width: 100%;
        height: calc(100vh - 136px);
    }

    ul.filters {
        margin-top: 14px;
        padding-left: 0px;
        list-style: none;
        display: flex;
        justify-content: space-around;

    & > li > button {
          margin-top: 5px;
          background-color: #ECECEC;
          border: none;
          border-radius: 6px;
          color: #079BAB;
          padding-left: 20px;
          padding-right: 20px;
          padding-top: 5px;
          padding-bottom: 5px;
      }
    }

    .search {
        margin-top: 15px;
        margin-left: 20px;
        padding-left: 5px;
        padding-right: 5px;
        width: calc(100% - 40px);
        height: 39px;
        border: none;
        border-radius: 6px;
        background-color: #ECECEC;
        color: #454545;
    }

    .icon-information {
        margin-top: 21px;
        margin-left: 20px;
        margin-right: 20px;
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

	.store-contribution {
		font-size: 12px;
		text-align: center;
	}

	.store-name {
		margin-top: 20px;
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 19px;
		text-transform: uppercase;
		color: #FEAD54;
		text-align: left;
	}

	@media (min-width: $large-device) {
		.store-name {
			margin-top: 10px;
			font-size: 26px;
			line-height: 32px;
		}
	}

	.store-address {
		margin-top: 10px;
		font-style: normal;
		font-weight: 600;
		font-size: 12px;
		line-height: 14px;
		text-transform: uppercase;
		color: #FEAD54;
		text-align: left;
	}

	@media (min-width: $large-device) {
		.store-address {
			font-size: 22px;
			line-height: 26px;
		}
	}

	.store-phone {
		text-align: left;
	}

    .store-no-contribution {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        /*text-transform: uppercase;
        color: #FEAD54;*/
		text-align: center;
		height : 50px;
		padding: 20px;
    }

	@media (min-width: $large-device) {
		.store-no-contribution {
			font-size: 20px;
			line-height: 28px;
		}
	}

    .waiting {
        margin-top: 30px;
        display: flex;
        //justify-content: space-between;
    }

    .detail-title {
        display: inline;
        line-height: 18px;
		width: 180px;
		text-align: left;
		margin-right: 20px;
    }

    .waiting-picto {
        width: 18px;
        height: 18px;
        display: inline;
        float: left;
    }

    .waiting-value {
        margin-left: 20px;
        display: inline;
        float: left;
        line-height: 18px;
        font-style: normal;
        font-weight: bold;
        font-size: 10px;
        text-align: center;
        color: #015468;
    }

    .inventory {
        margin-top: 30px;
        display: flex;
        //justify-content: space-between;
    }

    .inventory-status {
        display: none;
        height: 32px;
    }

    .visible {
        visibility: visible;
        display: block;
    }

    .rules {
        margin-top: 30px;
        display: flex;
    }

    .rules-icon {
		width: 32px;
		height: 32px;
		display: inline;
		margin-right: 20px;
    }

	a.call {
		margin-top: 35px;
		display: inline-block;
		height: 36px;
		width: 120px;
		background-color: #079BAB;
		border-radius: 6px;
		border: none;
		color: white;
		padding-left: 10px;
		text-align: center;
		font-size: 12px;
		line-height: 36px;
		text-decoration: none;

		&::before {
			content: " ";
			background-image: url(/images/phone.svg);
			background-repeat: no-repeat;
			position: absolute;
			margin-left: -25px;
			margin-top: 10px;
			height: 21px;
			width: 18px;
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
    }

	.empty {
		height: 27px;
		width: 60px;
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
		background-color: #ECECEC;
		color: #5E5E5E;
		font-size: 8px;
		line-height: 27px;
		text-align: center;

		&.active {
			background-color: $color-info;
			color: white;
		}
	}

	.partly-filled {
		height: 27px;
		width: 60px;
		background-color: #ECECEC;
		color: #5E5E5E;
		font-size: 8px;
		line-height: 13px;
		border-left: solid #5E5E5E 1px;
		text-align: center;

		&.active {
			background-color: $color-info;
			color: white;
			border-left: solid white 1px;
		}
	}

	.well-filled {
		height: 27px;
		width: 60px;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
		background-color: #ECECEC;
		color: #5E5E5E;
		font-size: 8px;
		line-height: 13px;
		border-left: solid #5E5E5E 1px;
		text-align: center;

		&.active {
			background-color: $color-info;
			color: white;
			border-left: solid white 1px;
		}
	}
</style>
