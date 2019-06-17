<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">比赛分组</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 分组人数（{{numArr.length}}人）
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="gridModal">设置</button>
			</view>
		</view>

		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 开始分组（左右两队pk）
			</view>
			<view class="action">
				<button class="cu-btn bg-cyan shadow" @tap="ToggleDelay">开始执行</button>
			</view>
		</view>
		<view class="padding-sm">
			<view class="flex flex-wrap justify-around">
				<button class="margin-sm basis-sm shadow cu-btn" :class="['bg-' + colorsList[item%8],toggleDelay?'animation-slide-bottom':'']"
				 :style="[{animationDelay: (index + 1)*0.1 + 's'}]" v-for="(item,index) in numArr" :key="index">{{item}}</button>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<radio-group class="block" @change="gridChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in numOptions" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item}} 人局</view>
								<radio class="round" :value="item"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numArr: [],
				numOptions: [6, 8],
				modalName: null,
				animation: '',
				toggleDelay: false,
				colorsList: ['red', 'orange', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve']
			};
		},
		onLoad() {
			this.genArr(6)
		},
		methods: {

			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			gridChange(e) {
				let num = parseInt(e.detail.value, 10)
				this.genArr(num)
				this.modalName = null
			},
			ToggleDelay() {
				this.randomArr()
				this.toggleDelay = true;
				setTimeout(() => {
					this.toggleDelay = false
				}, 1000)
			},
			genArr(num) {
				let arrs = []
				for (var i = 0; i < num; i++) {
					arrs.push(i + 1)
				}
				this.numArr = arrs
			},
			shuffle(a) {
				for (let i = a.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[a[i], a[j]] = [a[j], a[i]];
				}
				return a;
			},
			randomArr() {
				this.numArr = this.shuffle(this.numArr)
			}
		},
	}
</script>

<style>
	@import "../../colorui/animation.css";

	image[class*="gif-"] {
		border-radius: 6upx;
		display: block;
	}

	.page {
		height: 100vh;
	}
</style>
