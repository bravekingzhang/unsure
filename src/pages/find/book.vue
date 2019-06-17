<template name="book">
	<view class="cu-card case">
		<view class="cu-item shadow" v-for="(item,index) in bookDatas" :key="index" :data-id="index" :data-url="item.link"
		 @tap="toDetail">
			<view class="image">
				<image :src="item.image" mode="widthFix"></image>
				<view class="cu-tag bg-blue">{{item.tag}}</view>
				<view class="cu-bar bg-shadeBottom"> <text class="text-cut-fix">{{item.desc}}</text></view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="backgroundImages[index]"></view>
					<view class="content flex-sub">
						<view class="text-grey">{{item.title}}</view>
						<view class="text-gray text-sm flex justify-between">
							{{item.date}}
							<view class="text-gray text-sm">
								<!-- <text class="cuIcon-attentionfill margin-lr-xs"></text> 10
								<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
								<text class="cuIcon-messagefill margin-lr-xs"></text> 30 -->
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
			console.log("数据参数是" + this.bookDatas)
		},
		props: {
			bookDatas: {
				type: Array,
				default: []
			},
		},
		methods: {
			toDetail(e) {
				// console.log("点击url是" + e.currentTarget.dataset.url)
				// uni.navigateTo({
				// 	url: '../webview/webview?url=' + e.currentTarget.dataset.url
				// });
				uni.showModal({
					title: '提示',
					content: "如果需要本书epub，可以给大佬发邮件哦！",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('朕知道啦');
						} 
					}
				});
			}
		},
		computed: {
			backgroundImages() {
				let results = []
				for (let book of this.bookDatas) {
					results.push("background-image:url(" + book.image + ");")
				}
				return results
			}
		},
	}
</script>

<style>
	.text-cut-fix {
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		overflow: hidden;
		background: #4A4A4A;
	}
</style>
