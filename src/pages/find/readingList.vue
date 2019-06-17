<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">好书推荐</block>
		</cu-custom>
		<scroll-view scroll-y>
			<book :bookDatas="datas"></book>
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
				categorie: '',
				datas: [],
				page: 1
			};
		},
		onReady() {
			this.askData()
		},
		onPullDownRefresh() {
			this.page = 1;
			this.askData()
		},
		onReachBottom() {
			this.page = this.page + 1;
			this.askData()
		},
		onLoad(option) {
			console.log(option.categorie); //打印出上个页面传递的参数。
			this.categorie = option.categorie
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
				if (this.categorie == '') {
					return
				}
				this.toggleLoadmore()
				uni.request({
					url: 'https://brzhang.club/nodeapi/api/mebook?categorie=' + this.categorie + '&page=' + this.page,
					success: (res) => {
						console.log(res)
						if (res.data.code == 0) {
							if (this.page == 1) {
								this.datas = res.data.data
							} else {
								this.datas = this.datas.concat(res.data.data)
							}
						}
						this.toggleLoadmore()
					}
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100%;
	}
</style>
