<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
		<view>
			<text class="sub-title">{{subTitle}}</text>
		</view>
		<button @click="onLoginClick" class="login-button">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '迷茫',
				subTitle: '迷茫的人生，如何才能走出困境，如何获得重生，一切尽在这里面',
				userInfo: {}
			}
		},
		onLoad() {
			let that = this
			uni.getStorage({
				key: 'userinfo',
				success: function(res) {
					console.log(res.data);
					if(res.data){
						that.userInfo = res.data;
						uni.reLaunch({
							url:'../main/main'
						})
					}
				}
			});
		},
		onShow() {

		},
		methods: {
			onLoginClick: function() {
				let that = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								that.userInfo = infoRes.userInfo;
								uni.setStorageSync('userinfo', infoRes.userInfo)
								console.log('用户信息已经存入缓存')
							}
						});
					}
				});
			},

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 42upx;
		color: rgba(0, 0, 0, 0.84);
		letter-spacing: -0.51upx;
		text-align: center;
	}

	.sub-title {
		margin-top: 182upx;
		opacity: 0.8;
		font-family: PingFangSC-Semibold;
		font-size: 24upx;
		color: #4A4A4A;
		letter-spacing: 0;
		text-align: center;
		line-height: 28upx;
	}

	.login-button {
		margin-top: 160upx;
		width: 80%;
		background: #FF6265;
		border-radius: 16upx;
		color: #fff;
	}
</style>
