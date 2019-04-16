<template>
	<view class="container">
		<view v-for="(item,index) in feeds" :key="index">
			<image :src="item.imageUrl"></image>
			<view class="userinfo-pannel">
				<image class="user-head-small" :src="item.userinfo.icon"></image>
				<view class="userinfo-name-ctime">
					<text class="user-nick-name">{{item.userinfo.name}}</text>
					<text class="feed-ctime">{{item.ctime}}</text>
				</view>
				<image></image>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				feeds: [{
						feedid: 5527738823,
						imageUrl: "http://www.sucaifengbao.com/uploadfile/photo/meinvtupianbizhi/meinvtupianbizhi_813_088.jpg",
						userinfo: {
							name: 'hz',
							icon: 'http://wx.qlogo.cn/mmopen/vi_32/zwwoDCsJPbGC5xM5sLhMH2EDBodCGd2a98zR0STdialplnYLBPLIY0dkJatiaMtx6PtS1qicbibU6lZabgUn7Sp1BA/132'
						},
						ctime: 132332456
					},
					{
						feedid: 5527738823,
						imageUrl: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/05/ChMkJ1bKyLCId12fAAT2ChKXq-8AALIFwBHDRIABPYi783.jpg",
						userinfo: {
							name: 'hz',
							icon: 'http://wx.qlogo.cn/mmopen/vi_32/zwwoDCsJPbGC5xM5sLhMH2EDBodCGd2a98zR0STdialplnYLBPLIY0dkJatiaMtx6PtS1qicbibU6lZabgUn7Sp1BA/132'
						},
						ctime: 132332456
					},
					{
						feedid: 5527738823,
						imageUrl: "http://www.sucaifengbao.com/uploadfile/photo/meinvtupianbizhi/meinvtupianbizhi_813_088.jpg",
						userinfo: {
							name: 'hz',
							icon: 'http://wx.qlogo.cn/mmopen/vi_32/zwwoDCsJPbGC5xM5sLhMH2EDBodCGd2a98zR0STdialplnYLBPLIY0dkJatiaMtx6PtS1qicbibU6lZabgUn7Sp1BA/132'
						},
						ctime: 132332456
					}
				]
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(res) {
					that.userInfo = res.data;
					console.log(res.data)
				}
			})
		},
		onShow() {

		},
		methods: {

		}
	}
</script>

<style>
	.user-head-small {
		width: 64upx;
		height: 64upx;
		border-radius: 32upx;
	}

	.user-nick-name {
		font-family: Helvetica;
		font-size: 24upx;
		color: #4A4A4A;
		letter-spacing: 0;
	}

	.feed-ctime {
		font-family: PingFangSC-Semibold;
		font-size: 20upx;
		color: #9B9B9B;
		letter-spacing: 0;
	}

	.userinfo-pannel {
		display: flex;
		align-content: center;
		align-items: center;
	}
	.userinfo-name-ctime{
		margin-left: 25upx;
		display: flex;
		flex-direction: column;
		align-content: center;
	}
</style>
