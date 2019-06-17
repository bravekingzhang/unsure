<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{rssItem.title}}</block>
		</cu-custom>
		<!-- <scroll-view scroll-y> -->
			<view class="html-content">
				<div>
					<u-parse :content="rssItem.content" @preview="preview" @navigate="navigate"></u-parse>
				</div>
			</view>
		<!-- </scroll-view> -->
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
	import uParse from '@/components/u-parse/u-parse.vue'

	export default {
		components: {
			uParse
		},
		data() {
			return {
				rssItem: this.$store.state.rssItem,
			}
		},
		onReady() {
			console.log("onReady"); //打印出上个页面传递的参数
		},
		onShow() {
			console.log("onShow", this.$store.state.rssItem)
		},
		computed: {
			
		},
		methods: {
			preview(src, e) {
				// do something
			},
			navigate(href, e) {
				// do something
			}
		},
	}
</script>

<style>
	@import url("../../components/u-parse/u-parse.css");
	.text {
		padding: 25upx;
		height: 100upx;
		color: #4A4A4A;
		font-size: 28upx;
		font-style: italic;
		font-weight: 200;
	}
	.html-content{
		padding: 25upx;
	}
</style>
