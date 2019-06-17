<template name="android">
	<view class="cu-card case">
		<view class="cu-item shadow" v-for="(item,index) in androidDatas" :key="index" :data-id="index" :data-url="item.url" @tap="navigateUrl">
			<view class="image" v-if="item.images && item.images.length>0">

				<image :src="item.images[0]" mode="widthFix"></image>
				<view class="cu-tag bg-blue">{{item.source}}</view>
				<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.desc}}</text></view>
			</view>
			<view class="text" v-else>
				<text>{{item.desc}}</text>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="backgroundImages[index]"></view>
					<view class="content flex-sub">
						<view class="text-grey">{{item.who}}</view>
						<view class="text-gray text-sm flex justify-between">
							<view class="text-gray text-sm">
								<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
								<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
								<text class="cuIcon-messagefill margin-lr-xs"></text> 30
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		created: function(e) {
			console.log("数据参数是" + this.androidDatas)
		},
		props: {
			androidDatas: {
				type: Array,
				default: []
			},
		},
		computed: {
			backgroundImages() {
				let results = []
				for (let ios of this.androidDatas) {
					if (ios.images && ios.images.length > 0) {
						results.push("background-image:url(" + ios.images[0] + ");")
					} else {
						if (results.length > 0) {
							results.push(results[0])
						}
					}
				}
				return results
			}
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			navigateUrl(e) {
				// console.log("点击url是" + e.currentTarget.dataset.url)
				// uni.navigateTo({
				// 	url: '../webview/webview?url=' + e.currentTarget.dataset.url
				// });
				let url = e.currentTarget.dataset.url
				uni.showModal({
					showCancel: false,
					confirmText: "朕知道啦",
					title: "提示",
					content: "外部链接需要复制到浏览器打开，点确定帮陛下复制链接",
					success: () => {
						uni.setClipboardData({
							data: url,
							success: function() {
								console.log('success');
							}
						});
					}
				})
			},
		},
	}
</script>

<style>
	.text{
		padding: 25upx;
		height: 100upx;
		color: #4A4A4A;
		font-size: 28upx;
		font-style: italic;
		font-weight: 200;
	}
</style>
