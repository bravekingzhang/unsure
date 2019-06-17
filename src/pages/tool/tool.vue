<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">工具集</block>
		</cu-custom>
		<scroll-view scroll-y class="page">
			<!-- <image src="https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358228-assets/web-upload/e256b4ce-d9a4-488b-8da2-032747213982.png"
			 mode="widthFix" class="response"></image> -->
			<view class="nav-list nav-list-fix">
				<view hover-class="none" :url="''" :data-categorie="categorie[index]" @tap="ontap" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.icon"></text>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categorie: [
					'random_team',
					'rss',
					'hanzi',
					'khkb',
					'lvxzj',
					'xdwx',
					'gcsz',
					'shys',
				],
				elements: [{
						title: '篮球分组',
						name: 'randomTeam',
						color: 'cyan',
						icon: 'newsfill'
					},
					{
						title: 'rss',
						name: 'rss',
						color: 'blue',
						icon: 'colorlens'
					},
					{
						title: '写汉字',
						name: 'hanzi',
						color: 'purple',
						icon: 'font'
					},
					{
						title: '等你来提 ',
						name: 'readForU',
						color: 'mauve',
						icon: 'icon'
					},
					{
						title: '等你来提',
						name: 'readForU',
						color: 'pink',
						icon: 'btn'
					},
					{
						title: '等你来提',
						name: 'readForU',
						color: 'brown',
						icon: 'tagfill'
					},
					{
						title: '等你来提',
						name: 'readForU',
						color: 'red',
						icon: 'myfill'
					},
					{
						title: '等你来提',
						name: 'readForU',
						color: 'orange',
						icon: 'icloading'
					}
				],
			};
		},
		methods: {
			ontap(e) {
				let categorie = e.currentTarget.dataset.categorie
				switch (categorie) {
					case 'random_team':
						uni.navigateTo({
							url: 'randomTeam'
						})
						break;
					case 'rss':
						uni.navigateTo({
							url: '../main/home'
						})
						break;
					case 'hanzi':
						uni.navigateTo({
							url: 'hanziWrite'
						})
						break;
					default:
						uni.showModal({
							showCancel: false,
							confirmText: "朕知道啦",
							title: "提示",
							content: "陛下可以提需求，加好玩的工具进来",
							success: () => {

							}
						})
						break;
				}
			}
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.nav-list-fix {
		margin-top: 50rpx;
	}
</style>
