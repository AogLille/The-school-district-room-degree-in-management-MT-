<template>
	<div>
		<div class="icon-back" @click="tologin">
			<van-icon size="25" name="arrow-left" />
		</div>
		<div>
			<p>注册</p>
		</div>
		<van-form>
			<van-cell-group>
				<!-- 用户名 -->
				<van-field v-model="username" required label="用户名" placeholder="请输入用户名号" :rules="[{ required: true }]" />
				<!-- 身份证号 -->
				<van-field v-model="idNumber" required label="身份证号" placeholder="请输入身份证号" :rules="[{ required: true }, { pattern: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证格式错误！' }]" />
				<!-- 手机号 -->
				<van-field v-model="phone" required label="手机号" placeholder="请输入手机号" :rules="[{ required: true }, { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' }]" />
				<!-- 手机验证码 -->
				<!-- <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
					<template #button>
						<van-button size="small" type="primary">发送验证码</van-button>
					</template>
				</van-field> -->
				<!-- 密码 -->
				<van-field v-model="password" required type="password" label="密码" placeholder="请输入密码" :rules="[{ required: true }, { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '密码格式错误！(至少8-16个字符，至少1个大写字母，1个小写字母和1个数字)' }]" />
				<!-- 确认密码 -->
				<van-field v-model="password1" required type="password" label="确认密码" placeholder="请再次输入密码" />
			</van-cell-group>
			

			<van-popup v-model="showPicker" position="bottom">
				<van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
			</van-popup>
		</van-form>
		<div style="margin: 16px">
			<van-button round block type="info" native-type="submit" @click="onsubmit">注册</van-button>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'
export default {
	data() {
		return {
			username: '',
			idNumber: '',
			phone: '',
		
			password: '',
			password1: '',
			value: '',
			showPicker: false,
		}
	},
	methods: {
		onConfirm(value) {
			this.value = value
			this.showPicker = false
		},
		tologin() {
			this.$router.go(-1)
		},
		onsubmit() {
			if (this.idNumber == '' || this.username == '' ||this.phone == ''  || this.password == '' || this.password1 == '') {
				Toast('注册失败！信息未完善')
			} else if (this.password != this.password1) {
				Toast('密码输入两次不一致！')
			} else {
				axios({
					method: 'post',
					url: 'http://localhost:8888/user',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
					},
					data: {
						username:this.username,
						phone: this.phone,
						idNumber: this.idNumber,
						password: this.password,
					},
				})
					.then((res) => {
						//请求成功后执行函数
						if (res.data.code === 1) {
							this.$router.push('/login') //登录验证成功路由实现跳转
							this.$notify({
								title: '提示',
								message: '用户注册成功',
								duration: 3000,
							})
						} else {
							this.$notify({
								title: '提示',
								message: '用户注册失败',
							})
						}
					})
					.catch((err) => {
						//请求错误后执行函数
						this.$notify({
							title: '提示',
							message: '用户注册错误',
							duration: 3000,
						})
						console.log(err)
					})

				this.$router.push({ path: '/login' })
			}
		},
	},
}
</script>

<style scoped>
.icon-back {
	position: absolute;
	left: 2px;
	top: 15px;
}
</style>

<style scoped>
@import '../assets/css/register.css';
</style>
