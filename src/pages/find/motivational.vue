<template name='motivaltional'>
	<view class="cu-card">
		<view class="cu-item shadow" v-for="(item,index) in motivaDatas" :key="index" :data-id="index" >
			<view class="cu-list">
				<view class="cu-item">
					<view class="text">
						<view>{{item.chinese}}</view>
					</view>
				</view>
			</view>
			<view class="text-content">
				{{item.english}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		created: function(e) {
			console.log("数据参数是" + this.motivaDatas)
		},
		data() {
			return {

			}
		},
		props: {
			motivaDatas: {
				type: Array,
				default: []
			},
		},
		methods: {
		}
	}
</script>

<style>
	.text {
		padding: 35upx;
		height: 100upx;
		color: #4A4A4A;
		font-size: 28upx;
		font-style: italic;
		font-weight: 200;
	}

	.text-content {
		padding: 35upx;
		color: #4A4A4A;
		font-size: 28upx;
	}
</style>
