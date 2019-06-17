<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">技术前线</block>
		</cu-custom>

		<scroll-view scroll-y class="scroller-view-rss-container">
			<view class="rss-item-container" v-for="(item,index) in rssArr" :data-url="item.url" :data-id="index" :key="index" @tap="onRssTap" @longpress="onDelete">
				<view class="cu-avatar round lg margin-xs" :class="'bg-' + ColorList[index].name">
					<text class="avatar-text">{{rssArrShortNames[index]}}</text>
				</view>
				<text class="avatar-text">{{item.title}}</text>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>


		<picker class="bottom-right" @change="bindPickerChange" :value="index" :range="rssNames">
			<image class="bottom-right" src="/static/rss_add.png" mode="aspectFit"></image>
		</picker>
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view>

	</view>
</template>

<script>
	let Parser = require('rss-parser');
	export default {
		data() {
			return {
				ColorList: this.ColorList,
				loadModal: false,
				rssFeeds: [], //添加源
				rssArr: [], //已经加载的
			};
		},
		onReady() {
			this.loadRssList()
			this.askData()
		},
		onShow() {},
		computed: {
			rssNames() {
				let array = []
				this.rssFeeds.forEach(function(item) {
					array.push(item.name)
				})
				return array
			},
			rssArrShortNames() {
				let array = []
				this.rssArr.forEach(function(item) {
					array.push(item.title.substr(0, 2))
				})
				return array
			}
		},
		methods: {
			loadRssList() {
				const value = uni.getStorageSync('storage_key_rss');
				console.log("loadRssList缓存对象是", value)
				var rssArr
				try {
					rssArr = JSON.parse(value)
				} catch (e) {
					rssArr = this.initRss()
				}
				this.rssArr = rssArr;
			},
			initRss() { //预置5条
				let rssArr = []
				rssArr.push({
					'title': '掘金人工智能',
					'url': 'https://brzhang.club/rsshub/juejin/category/ai'
				})
				rssArr.push({
					'title': '技术头条',
					'url': 'https://brzhang.club/rsshub/blogread/newest'
				})
				//初始化的写入到storage中去
				uni.setStorageSync('storage_key_rss', JSON.stringify(rssArr))
				return rssArr
			},
			toggleLoadmore() {
				this.loadModal = !this.loadModal;
			},
			askData() {
				this.toggleLoadmore()
				uni.request({
					url: 'https://brzhang.club/nodeapi/api/rss',
					success: (res) => {
						this.toggleLoadmore()
						if (res.data.code == 200) {
							this.rssFeeds = res.data.data;
						}
					},
					fail: (error) => {
						this.toggleLoadmore()
						console.log(error)
					}
				})
			},
			rssExist(url, rssArr) {
				for (let item of rssArr) {
					console.log("rssExist", item.url)
					if (item.url.startsWith(url)) {
						return true
					}
				}
				return false
			},
			doAddRss(index) {
				//添加rss，添加到缓存中
				let url = this.rssFeeds[index].feed
				try {
					const value = uni.getStorageSync('storage_key_rss');
					console.log("缓存对象是")
					console.log(value)
					if (value) { //检查是否已经添加了rss了
						let rssArr = JSON.parse(value)
						console.log("JSON.parse", rssArr)
						if (this.rssExist(url, rssArr)) {
							uni.showToast({
								icon: 'none',
								title: '已经添加该rss，请勿重复添加!'
							})
							return
						}
					}
					this.loadRss(url)
				} catch (e) {
					// error
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '加载Storage异常'
					})
				}
			},
			writeStorage(item, url) {
				var value = uni.getStorageSync('storage_key_rss');
				var rssArr;
				try {
					rssArr = JSON.parse(value)
				} catch (e) {
					rssArr = []
				}
				rssArr.push({
					'title': item.title,
					'url': url
				})
				this.rssArr = rssArr
				uni.setStorageSync('storage_key_rss', JSON.stringify(rssArr))
				console.log("写入一条rss")
			},
			loadRss(url) {
				this.toggleLoadmore()
				uni.request({
					url: url,
					success: (res) => {
						this.toggleLoadmore()
						if (res.statusCode === 200 && res.data) {
							let parser = new Parser({});
							let that = this
							parser.parseString(res.data, function(err, feed) {
								console.log(feed)
								that.writeStorage(feed, url)
							})
						} else {
							uni.showToast({
								icon:'none',
								title: "解析rss源失败，请稍后再试！"
							})
						}
					},
					fail: (error) => {
						this.toggleLoadmore()
						uni.showToast({
							icon:'none',
							title: "解析rss源失败，请稍后再试！"
						})
					}
				})
			},
			bindPickerChange(e) {
				this.doAddRss(e.detail.value)
			},
			onRssTap(e) {
				let url = e.currentTarget.dataset.url
				uni.navigateTo({
					url: './rssListView?url=' + url
				});
			},
			onDelete(e) {
				let index = e.currentTarget.dataset.id
				let rssItem = this.rssArr[index]
				uni.showModal({
					title: '提示',
					content: '是否删除'+rssItem.title,
					success: (res) => {
						if (res.confirm) {
							this.doDelete(rssItem.url);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			doDelete(url){
				const value = uni.getStorageSync('storage_key_rss');
				console.log("缓存对象是")
				console.log(value)
				if (value) { //检查是否已经添加了rss了
					try {
						let rssArr = JSON.parse(value)
						let rssArrNew = []
						for (let rss of rssArr) {
							if (!rss.url.startsWith(url)) {
								rssArrNew.push(rss)
							}
						}
						uni.setStorageSync('storage_key_rss', JSON.stringify(rssArrNew))
						this.rssArr = rssArrNew
						uni.showToast({
							title: '删除成功'
						})
					} catch (e) {
						console.log(e)
						uni.showToast({
							icon: 'none',
							title: '缓存异常，请稍后再试'
						})
					}
				}
			}
		}
	}
</script>

<style>
	.page {
		height: 100%;
	}

	.bottom-right {
		position: sticky;
		right: 55upx;
		bottom: 25upx;
		width: 81upx;
		height: 81upx;
		float: right;
	}

	.rss-item-container {
		background: #FFFFFF;
		margin: 25upx;
		padding: 25upx;
		border-radius: 15upx;
	}

	.scroller-view-rss-container {
		height: 80%;
	}
</style>
