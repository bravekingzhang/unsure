<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">娱乐写字</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> step1.输入你想写的汉字
			</view>
		</view>
		<view class="cu-form-group margin-bottom-xl">
			<view class="title">请输入你想写的字</view>
			<input placeholder="士" type="text" maxlength="1" @blur="onTextBlur" name="input"></input>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> step2.观察正确笔画
			</view>
			<view class="action">
				<button class="cu-btn round line-yellow shadow" @tap="onReplay">重放</button>
			</view>
		</view>
		<hanzi-writer-view id="hz-animator" width="100" height="100" />
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> step3.自己来写得试试
			</view>
			<view class="action">
				显示轮廓<switch :class="showOutline?'checked':''" :checked="showOutline?true:false" @change="isShowOutline"></switch>
			</view>
		</view>
		<hanzi-writer-view id="hz-writer" width="300" height="300" />
	</view>
</template>

<script>
	let createHanziWriterContext = require('../../wxcomponents/hanzi-writer-miniprogram/index.js')
	export default {
		data() {
			return {
				character: '士',
				showOutline: true
			};
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {

				if (this.animateCtx) {
					this.animateCtx.destroy()
				}
				if (this.writerCtx) {
					this.writerCtx.destroy()
				}
				this.animateCtx = createHanziWriterContext({
					id: 'hz-animator',
					character: encodeURI(this.character),
					page: this,
					showHintAfterMisses: 1,
					renderer:'svg'
				});
				this.writerCtx = createHanziWriterContext({
					id: 'hz-writer',
					character: encodeURI(this.character),
					page: this,
					showHintAfterMisses: 1,
				});
				// You can call any normal HanziWriter method here
				this.animateCtx.animateCharacter();
				this.writerCtx.quiz();
			},
			restart() {
				this.animateCtx.animateCharacter();
				this.writerCtx.quiz();
			},
			isShowOutline(e) {
				this.showOutline = e.detail.value
				if (this.showOutline) {
					this.writerCtx.showOutline()
				} else {
					this.writerCtx.hideOutline()
				}
			},
			onReplay(){
				this.restart()
			},
			onTextBlur(e) {
				let input = e.detail.value
				var pattern = /[\u4e00-\u9fa5]/;
				if (pattern.test(input)) {
					this.character = input
					this.animateCtx.setCharacter(encodeURI(this.character))
					this.writerCtx.setCharacter(encodeURI(this.character))
					this.restart()
				} else {
					uni.showModal({
						title: '提示',
						content: '请输入中文汉子',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			}
		},
	}
</script>

<style>

</style>
