<template name="travel">
	<view class="cu-card case">
		<view class="cu-item shadow" v-for="(item,index) in travelDatas" :key="index" :data-id="index">
			<view class="image">
				<image :src="item.image" mode="widthFix"></image>
				<view class="cu-tag bg-blue">绿野</view>
				<view class="cu-bar bg-shadeBottom"> <text class="text-cut-fix">{{item.desc}}</text></view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="backgroundImages[index]"></view>
					<view class="content flex-sub">
						<view class="text-grey">{{item.title}}</view>
						<view class="text-gray text-sm flex justify-between">

							<view class="text-gray text-sm">
								<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
								<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
								<text class="cuIcon-messagefill margin-lr-xs"></text> 30
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		created: function(e) {
			console.log("数据参数是" + this.travelDatas)
		},
		props: {
			travelDatas: {
				type: Array,
				default: []
			},
		},
		computed: {
			backgroundImages() {
				let results = []
				for (let welfare of this.travelDatas) {
					results.push("background-image:url(" + welfare.image + ");")
				}
				return results
			}
		},
	}
</script>

<style>
	.text-cut-fix {
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
