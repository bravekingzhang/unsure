<template name="reading">
	<view>
		<scroll-view scroll-y class="page">
			<!-- <image src="https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358228-assets/web-upload/e256b4ce-d9a4-488b-8da2-032747213982.png"
			 mode="widthFix" class="response"></image> -->
			<view class="nav-list nav-list-fix">
				<navigator hover-class="none" :url="'readingList?categorie=' + categorie[index]" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.icon"></text>
				</navigator>
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
					'jdmz',
					'jsls',
					'wxyq',
					'khkb',
					'lvxzj',
					'xdwx',
					'gcsz',
					'shys',
				],
				elements: [{
						title: '社会',
						name: 'social',
						color: 'cyan',
						icon: 'newsfill'
					},
					{
						title: '历史',
						name: 'history',
						color: 'blue',
						icon: 'colorlens'
					},
					{
						title: '穿越',
						name: 'through',
						color: 'purple',
						icon: 'font'
					},
					{
						title: '恐怖 ',
						name: 'terrorist',
						color: 'mauve',
						icon: 'icon'
					},
					{
						title: '旅行',
						name: 'travel',
						color: 'pink',
						icon: 'btn'
					},
					{
						title: '励志',
						name: 'motivational',
						color: 'brown',
						icon: 'tagfill'
					},
					{
						title: '人生',
						name: 'live',
						color: 'red',
						icon: 'myfill'
					},
					{
						title: '运动',
						name: 'movement',
						color: 'orange',
						icon: 'icloading'
					}
				],
			};
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
