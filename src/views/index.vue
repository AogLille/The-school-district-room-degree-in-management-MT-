<template>
	<div class="index">
		<!-- 导航 -->
		<van-nav-bar title="学区房学位管理" left-text="返回" left-arrow @click-left="onClickLeft" />
		<!-- 查询个人名下房产模块 -->
		<div class="content_per">
			<div class="pic"></div>
			<van-button class="per" type="primary" icon="manager-o" @click="onPerson" :disabled="!checked">查询个人房产信息</van-button>
		</div>
		<!-- 查询指定房产证号的房产模块 -->
		<div class="content_card">
			<div class="pic"></div>
			<van-button class="card" type="primary" icon="location-o" @click="onHousecard" :disabled="!checked">查询房产证号房产信息</van-button>
		</div>
		<!-- 输入房产证号的弹窗 -->
		<van-dialog v-model="show" title="房产证号查询" show-cancel-button :before-close="closebefore" @confirm="Sure()">
			<van-cell-group>
				<van-field v-model="value" label="房产证号" placeholder="请输入房产证号：" />
			</van-cell-group>
		</van-dialog>
		<!-- 房产证号错误的弹窗 -->
		<van-dialog title="注意" v-model="errorshow">
			<p>房产证号错误或不存在!</p>
		</van-dialog>
		<!-- 阅读协议，只有同意协议才能点击按钮 -->
		<div class="en">
			<div class="tip">注意事项</div>
			1、查询结果仅为查询当日房屋锁定状态，仅供参考
			<br />
			2、查询结果不作为任何法律依据，不承担任何法律责任
			<br />
			3、请输入与房屋产权证明登记完全一致的信息，若输入不准确会造成查询结果错误
			<div class="agree">
				<van-checkbox v-model="checked" icon-size="14px" label-disabled>我已阅读并同意以上注意事项</van-checkbox>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
export default {
	data() {
		return {
			checked: false,
			show: false,
			value: '',
			errorshow: false,
			Data: [],
		}
	},

	methods: {
		onClickLeft() {
			this.$router.push({ path: '/login' })
		},
		onPerson() {
			// 跳转到查询个人房产信息界面
			this.$router.push({ path: '/personal' })
		},
		onHousecard() {
			// 弹出输入房产证号的弹窗
			this.show = true
		},
		closebefore(action, done) {
			if (action === 'confirm') {
				return done(false)
			} else {
				return done()
			}
		},
		// 对房产证号进行判断
		Sure() {
			axios({
				method: 'get',
				url: 'http://localhost:8888/house/' + this.value,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
				},
			}).then((res) => {
				//请求成功后执行函数
				if (res.data.code === 1) {
					this.Data = [{ primary_state: res.data.data.primaryDegree, primary_date: res.data.data.primaryTime, junior_state: res.data.data.middleDegree, junior_date: res.data.data.middleTime }]
					console.log(this.Data)
					localStorage.setItem('data', JSON.stringify(this.Data))
					this.$router.push({ path: '/housecard' })
					//登录验证成功路由实现跳转
				} else {
					this.errorshow = true
					this.show = false
				}
			})
		},
	},
}
</script>

<style scoped>
@import '../assets/css/index.css';
</style>
