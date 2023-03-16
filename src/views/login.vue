<template>
	<div class="loginPage">
		<div class="login_logo"></div>
		<!-- 输入用户名 -->
		<div class="userName">
			<van-cell-group inset>
				<van-field v-model="username" label="用户名" placeholder="请输入用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
			</van-cell-group>
		</div>
		<!-- 输入密码 -->
		<div class="passWord">
			<van-cell-group inset>
				<van-field v-model="password" type="password" label="密码" placeholder="请输入密码" :rules="[{ required: true }, { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '密码格式错误！(至少8-16个字符，至少1个大写字母，1个小写字母和1个数字)' }]" />
			</van-cell-group>
		</div>
		<!-- 登录和注册按钮 -->
		<div class="login-reg">
			<!-- 登录按钮 -->
			<div class="login">
				<van-button class="button" plain type="primary" @click="onSubmit">登录</van-button>
			</div>
			<!-- 登录时，用户名或密码为空的弹窗 -->
			<van-dialog title="注意" v-model="emptyshow">
				<p>用户名和密码不能为空!</p>
			</van-dialog>
			<!-- 登录时，用户名或密码错误 -->
			<van-dialog title="注意" v-model="errorshow" >
				<p>用户名或密码错误!</p>
			</van-dialog>
			<!-- 注册按钮 -->
			<div class="reg">
				<van-button class="button" plain type="primary" @click="onRegis">注册</van-button>
			</div>
		</div>
		<!-- 验证码弹窗（默认不可见） -->
		<van-dialog class="verification" v-model="codeshow" :showConfirmButton="false" show-cancel-button close-on-click-overlay>
			<div style="display: inline-block">
				<verify type="2" :figure="10" @success="success" @error="error"></verify>
			</div>
		</van-dialog>
	</div>
</template>

<script>
import axios from 'axios'
import Verify from 'vue2-verify'
export default {
	name: 'app',
	components: {
		Verify,
	},
	data() {
		// 初始化数据
		return {
			// 用户名框初始化为空
			username: '',
			// 密码框初始化为空
			password: '',
			// 验证码弹窗初始化不可见
			codeshow: false,
			// 密码为空的弹窗不可见
			emptyshow: false,
			// 密码错误的弹窗不可见
			errorshow: false,
			// 错误弹窗信息

		}
	},
	methods: {
		onRegis() {
			this.$router.push({ path: '/register' })
		},
		onSubmit() {
			// 对输入的密
			axios({
				method: 'post',
				url: 'http://localhost:8888/user/login',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
				},
				data: {
					username: this.username,
					password: this.password,
				},
			})
				.then((res) => {
					//请求成功后执行函数
					if (res.data.code === 1) {
						this.codeshow = true
					} else {
						this.codeshow = true
						this.$notify({
							title: '提示',
							message: res.data.msg,
							duration: 3000,
						})
					}
				})
				.catch((err) => {
					//请求错误后执行函数
					this.codeshow = true
					this.$notify({
						title: '提示',
						message: '用户访问错误',
						duration: 3000,
					})
					// this.errorshow = true
					// console.log(err)
				})
		},

		// 如果验证码正确
		success(obj) {
			this.$router.push('/index')
			this.$notify({
				title: '提示',
				message: '用户登录成功',
				duration: 3000,
			})
			obj.refresh()
		},
		// 如果验证码错误
		error(obj) {
			//错误刷新验证码
			obj.refresh()
		},
	},
	/*if (this.username == '123456' && this.password == '123456') {
				console.log('登录成功')
				this.codeshow = true
			} else if (this.username == '' || this.password == '') {
				console.log('请输入账号或密码')
				this.emptyshow = true
			} else {
				console.log('账号或密码错误')
				this.errorshow = true
			}
			this.username = ''
			this.password = ''
		},
		// 如果验证码正确
		success(obj) {
			//验证码正确回调
			this.$router.push({ path: '/index' })
			obj.refresh()
		},
		// 如果验证码错误
		error(obj) {
			//验证码错误回调
			console.log('验证码错误')
			//错误刷新验证码
			obj.refresh()
		},
	},*/
}
</script>

<style scoped>
@import '../assets/css/login.css';
</style>
