<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{rssTitle}}</block>
		</cu-custom>
		<scroll-view scroll-y>
			<view class="cu-card article" v-for="(item,index) in rssItemsFormat" :key="index" :data-id="index" @click="onFeedClick"
			 @longpress="onDelete">
				<view class="cu-item shadow">
					<view class="title">
						<view class="text-cut">{{item.title}}</view>
					</view>
					<view class="content">
						<image v-if="item.image" :src="item.image" mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content">{{item.contentSnippet}}</view>
							<view>
								<view class="cu-tag bg-red light sm round">{{item.isoDate}}</view>
								<view class="cu-tag bg-green light sm round">{{item.author}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="cu-load load-modal" v-if="loadModal">
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
	let Parser = require('rss-parser');
	Date.prototype.Format = function(fmt) {
		var o = {
			"y+": this.getFullYear(),
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S+": this.getMilliseconds() //毫秒
		};
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				if (k == "y+") {
					fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
				} else if (k == "S+") {
					var lens = RegExp.$1.length;
					lens = lens == 1 ? 3 : lens;
					fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
				} else {
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				}
			}
		}
		return fmt;
	}
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				loadModal: false,
				rssTitle: '',
				rssItems: []
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log("onLoad" + option.url); //打印出上个页面传递的参数。
			this.loadRssItem(option.url)
		},
		onReady() {
			console.log("onReady"); //打印出上个页面传递的参数
		},
		computed: {
			rssItemsFormat() {
				let arr = []
				this.rssItems.forEach(function(item) {
					let data = new Date(item.isoDate)
					item.isoDate = data.Format("yyyy-MM-dd hh:mm:ss")
					arr.push(item)
				})
				return arr
			},
		},
		methods: {
			toggleLoadmore() {
				this.loadModal = !this.loadModal;
			},
			loadRssItem(url) {
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
								that.rssTitle = feed.title
								that.rssItems = feed.items
							})
						} else {
							uni.showToast({
								title: "解析rss源失败，请稍后再试！"
							})
						}
					},
					fail: (error) => {
						this.toggleLoadmore()
						uni.showToast({
							title: "解析rss源失败，请稍后再试！"
						})
					}
				})
			},
			onFeedClick(e) {
				console.log("onFeedClick")
				let index = e.currentTarget.dataset.id
				//Vuex设置
				console.log(this.$store)
				this.$store.commit({
					type: 'setRssItem',
					rssItem: this.rssItemsFormat[index]
				})
				uni.navigateTo({
					url: './rssDetail'
				})
			},
			...mapMutations(['logout']),
		},
	}
</script>

<style>
	.text {
		padding: 25upx;
		height: 100upx;
		color: #4A4A4A;
		font-size: 28upx;
		font-style: italic;
		font-weight: 200;
	}
</style>
