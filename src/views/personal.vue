<
<template>
	<div class="personal">
		<van-nav-bar title="个人房产信息查询结果" left-text="返回" left-arrow @click-left="onClickLeft" />
		<!-- 遍历个人信息的数据 -->
		<van-cell-group v-model="Data" v-for="(item, index) in Data" :key="index">
			<!-- 地区 -->
			<van-cell title="房产证号:" :value="item.id" class="w-h" />
			<van-cell title="所属辖区:" :value="item.schoolId" class="w-h" />
			<h6>小学学位状态</h6>
			<!-- 小学状态 -->
			<van-cell title="状态" :value="item.primaryDegree" />
			<!-- 小学日期 -->
			<van-cell title="解锁日期" :value="item.primaryTime" />
			<h6 class="junior">初中学位状态</h6>
			<!-- 初中状态 -->
			<van-cell title="状态" :value="item.middleDegree" />
			<!-- 初中日期 -->
			<van-cell title="解锁日期" :value="item.middleTime" />
		</van-cell-group>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			// 个人名下房产证学位信息
			Data: [
				{ id: '11', schoolId: '11', primaryDegree: '未解锁', primaryTime: '1111-11-11', middleDegree: '未解锁', middleTime: '1111-11-11' },
				{ id: '11', schoolId: '11', primaryDegree: '未解锁', primaryTime: '1111-11-11', middleDegree: '未解锁', middleTime: '1111-11-11' },
				{ id: '11', schoolId: '11', primaryDegree: '未解锁', primaryTime: '1111-11-11', middleDegree: '未解锁', middleTime: '1111-11-11' },
				{ id: '11', schoolId: '11', primaryDegree: '未解锁', primaryTime: '1111-11-11', middleDegree: '未解锁', middleTime: '1111-11-11' },
				{ id: '11', schoolId: '11', primaryDegree: '未解锁', primaryTime: '1111-11-11', middleDegree: '未解锁', middleTime: '1111-11-11' },
				{ id: '11', schoolId: '11', primaryDegree: '未解锁', primaryTime: '1111-11-11', middleDegree: '未解锁', middleTime: '1111-11-11' },
			],
			show: false,
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		onClickLeft() {
			this.$router.push({ path: '/index' })
		},
		showPopup() {
			this.show = true
		},
		getData() {
			axios({
				method: 'get',
				url: 'http://localhost:8888/house',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
				},
			}).then((res) => {
				//请求成功后执行函数
				if (res.data.code === 1) {
					this.Data = res.data.data
					console.log(this.Data)
					//登录验证成功路由实现跳转
				} else {
					this.$notify({
						title: '提示',
						message: '名下无房产',
						duration: 3000,
					})
				}
			})
		},
	},
}
</script>

<style scoped>
@import '../assets/css/personal.css';
</style>
