<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">每日美图</block>
		</cu-custom>
		<scroll-view scroll-y>
			<view class="cu-card case">
				<view class="cu-item shadow" v-for="(item,index) in images" :key="index" :data-id="index" :data-url="item.url">
					<view class="image">
						<image :src="'https://cn.bing.com'+item.url" mode="widthFix"></image>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.desc}}</text></view>
					</view>
					<view class="cu-list list-avatar">
						<view class="cu-item">
							<view class="content flex-sub">
								<view class="text-sm flex justify-between">
									<view class="text-sm">
										<text class="margin-lr-xs"></text> {{item.copyright}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				images: []
			}
		},
		onReady() {
			uni.request({
				url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=1&n=20',
				success: (result) => {
					console.log(result)
					if (result.statusCode == 200 && result.data) {
						this.images = result.data.images
					}
				}
			})
		}
	}
</script>

<style>
.list-avatar{
	padding-left: 25upx;
	padding-top: 30upx;
	padding-bottom: 30upx;
}
</style>
