<template>
	<view style=" display: flex; width: 100vw;color: black;height: 100vh;">
		<view style="display: flex; justify-self: center;flex-direction: column;">
			<image style="width: 90%;margin: 20px;" src="../../../static/image.png"></image>
			<view style="margin: 15px 0 0 15px;">{{$t('BDSBitem.title_0')}}</view>
			<view style="margin: 0 25px 0 15px;">{{$t('BDSBitem.title_1')}}。</view>
			<view style="position: fixed;bottom: 0; width: 100vw;">
				<view style="flex-direction: row; display: flex; margin-top: 100rpx; justify-content: center;">
					<checkbox style="font-size: 28rpx;" color="#ffffff" class="round" activeBackgroundColor="#3298F7"
						active-border-color="#DBDBDB" :checked="cb" @click="checked">{{$t('BDSBitem.title_2')}}
					</checkbox>
				</view>
				<button class="btn" @click="btn_next()">{{$t('zhuceitem.btn_0')}}</button>
				<view class="text" @click="bing_fail()">{{$t('BDSBitem.title_3')}}</view>
			</view>
		</view>
		<view>
			<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0" :mask-click="false">
				<view class="popup_bg">
					<view class="pupup_title" style="margin-top: 10px;">{{$t('BDSBitem.title_3')}}</view>
					<view style="margin-top: 20px; color: #999999;">{{$t('BDSBitem.title_4')}}</view>
					<view style="margin-top: 10px;color: #999999;">{{$t('BDSBitem.title_5')}}</view>
					<view style="margin-top: 10px;margin-bottom: 10px; color: #999999;">{{$t('BDSBitem.title_6')}}
					</view>
					<text style="color: #999999;">{{$t('BDSBitem.title_7')}}</text>
					<button class="btn" @tap="knowe()">{{$t('BDSBitem.title_8')}}</button>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cb: false,

			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('BDSB')
			})
		},
		methods: {
			checked() {
				if (this.cb == true) {
					this.cb = false
				} else {
					this.cb = true
				}
			},

			btn_next() {
				if (this.cb == false) {
					uni.showToast({
						title: "是否准备就绪",
						icon: 'none'
					})

				}


			},
			bing_fail() {
				this.$refs.popup.open("bottom")
			},
			knowe() {
				this.$refs.popup.close()
			}

		}
	}
</script>

<style>
	.btn {
		margin: 15px 20px 0 20px;
		border-radius: 25px;
		background: #3298F7;
		color: white;
	}

	.text {
		text-align: center;
		margin-top: 20px;
		margin-bottom: 20px;
		color: #3298F7;
		font-size: 14px;
	}

	.popup_bg {
		background: white;
		margin: 30rpx;
		border-radius: 50rpx;
		padding: 40rpx;
	}

	.pupup_title {
		font-weight: bold;
		font-size: 38rpx;
		text-align: center;
		margin-top: 10rpx;
	}
</style>