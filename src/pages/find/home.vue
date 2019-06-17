<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">指引</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in categorys" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<scroll-view scroll-y>
			<travel v-if="TabCur==0" :travelDatas="datas"></travel>
			<reading v-if="TabCur==1" :readingDatas="datas"></reading>
			<motivational v-if="TabCur==2" :motivaDatas="datas"></motivational>
			<view class="cu-tabbar-height"></view>
		</scroll-view>

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
				appid: 61913,
				secret: 'b423e093111643ada1923d2237f8bbc8',
				TabCur: 0,
				scrollLeft: 0,
				categorys: [
					"人在旅途",
					"爱上阅读",
					"练下口语",
				],
				datas: [],
				page: 1
			};
		},
		onReady() {
			this.askData()
		},
		onPullDownRefresh() {
			console.log("main home onPullDownRefresh")
			this.page = 1;
			this.askData()
		},
		methods: {
			toggleLoadmore() {
				this.loadModal = !this.loadModal;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.page = 1
				this.askData()
			},
			askData() {
				this.toggleLoadmore()
				switch (this.TabCur) {
					case 0:
						uni.request({
							url: 'https://brzhang.club/nodeapi/api/travel',
							success: (res) => {
								console.log(res)
								if (res.data.code === 0) {
									this.datas = res.data.data
								}
								this.toggleLoadmore()
							}
						})
						break;
					case 1:
						// uni.request({
						// 	url: 'https://brzhang.club/nodeapi/api/travel',
						// 	success: (res) => {
						// 		console.log(res)
						// 		if (res.data.code === 0) {
						// 			this.datas = res.data.data
						// 		}
						// 		this.toggleLoadmore()
						// 	}
						// })
						this.toggleLoadmore()
						break;
					case 2:
						uni.request({
							url: 'https://brzhang.club/nodeapi/api/showapi',
							success: (res) => {
								console.log(res)
								if (res.data.showapi_res_code === 0 && res.data.showapi_res_body.ret_code === 0) {
									this.datas = res.data.showapi_res_body.data
								}
								this.toggleLoadmore()
							}
						})
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style>
	.page {
		height: 100%;
	}
</style>
