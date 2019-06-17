<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">宅</block>
		</cu-custom>
		<view class="cu-list menu-avatar">
			<view class="cu-item" @tap="tohomepage">
				<view class="cu-avatar radius lg" :style="avatar"></view>
				<view class="content">
					<text class="text-cut">{{datas.name}}</text>
					<view class="text-gray text-sm flex"> <text class="text-cut"> {{datas.slogan}}</text></view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">点进小窝</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 大佬邮件（bravekingzhang@qq.com）
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 最近项目
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item,index) in datas.projects" :key="index" :data-url="item.link" @tap="ontap">
				<view class="cu-avatar  radius lg" :class="'bg-' + colors[index]">{{projectIcons[index]}}</view>
				<view class="content">
					<text class="text-cut">{{item.name}}</text>
					<view class="text-gray text-sm flex"> <text class="text-cut"> {{item.desc}}</text></view>
				</view>
				<view class="action">
				</view>
			</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadModal: false,
				datas: {},
				colors: [
					'red',
					'orange',
					'yellow',
					'olive',
					'green',
					'cyan',
					'blue',
					'purple',
				]
			};
		},
		onReady() {
			this.askData()
		},
		onPullDownRefresh() {
			this.askData()
		},
		methods: {
			toggleLoadmore() {
				this.loadModal = !this.loadModal;
			},
			askData() {
				this.toggleLoadmore()
				uni.request({
					url: 'https://brzhang.club/nodeapi/api/github', //仅为示例，并非真实接口地址。
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							this.datas = res.data.data;
						}
						this.toggleLoadmore()
					}
				});
			},
			ontap(e) {
				console.log("点击url是" + e.currentTarget.dataset.url)
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
			tohomepage() {
				// uni.navigateTo({
				// 	url: '../webview/webview?url=' + 'https://blog.brzhang.club'
				// });
				uni.showModal({
					showCancel: false,
					confirmText: "朕知道啦",
					title: "提示",
					content: "外部链接需要复制到浏览器打开，点确定帮陛下复制链接",
					success: () => {
						uni.setClipboardData({
							data: 'https://blog.brzhang.club',
							success: function() {
								console.log('success');
							}
						});
					}
				})
			}
		},
		computed: {
			avatar() {
				return 'background-image:url(' + this.datas.header + ')'
			},
			projectIcons() {
				let icons = []
				if (this.datas.projects) {
					for (let project of this.datas.projects) {
						icons.push(project.name.substring(0, 1))
					}
				}
				return icons
			}
		}
	}
</script>

<style>
	.page {
		height: 100%;
	}

	.cu-avatar.sm {
		width: 148rpx;
		height: 148rpx;
		font-size: 1em;
	}
</style>
