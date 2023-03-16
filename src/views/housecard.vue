<template>
	<div class="houseCard">
		<van-nav-bar title="房产证号查询结果" left-text="返回" left-arrow @click-left="onClickLeft" />
		<h5>小学</h5>
		<van-cell-group inset v-model="Data">
			<van-cell v-for="(item, index) in Data" :key="index" title="状态" :value="item.primary_state" />
			<van-cell v-for="(item, index) in Data" :key="index" title="解锁日期" :value="item.primary_date"/>
		</van-cell-group>
		<h5>初中</h5>
		<van-cell-group inset v-model="Data">
			<van-cell v-for="(item, index) in Data" :key="index" title="状态" :value="item.junior_state" />
			<van-cell v-for="(item, index) in Data" :key="index" title="解锁日期" :value="item.junior_date" />
		</van-cell-group>
	</div>
</template>

<script>
import axios from "axios";
import { onMounted } from 'vue';
export default {
	data() {
        // console.log(data);
        //
		 	return {
			Data:[],
			}

	
	},
	mounted(){this.getData()},
	methods: {
		onClickLeft() {
			this.$router.push({ path: '/index' })
		},
		getData(){
			this.Data = JSON.parse(localStorage.getItem('data'))
		},
	},
}
</script>

<style scoped>
@import '../assets/css/HousePropertyCard.css';
</style>
