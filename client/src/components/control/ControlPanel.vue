<template lang="html">
	<div>
		<div class="col pt-3 pb-3">
			<h2 class="text-danger text-left pb-3">设备控制</h2>
			<div class="col btn-group-lg btn-group-vertical">
				<app-control-button v-for="button in deviceButtons" :key="button.id" v-bind:myButton="button"></app-control-button>
			</div>
		</div>
		<div class="col pt-3 pb-3">
			<h2 class="text-danger text-left pb-3">播放控制</h2>
			<div class="col btn-group-lg btn-group-vertical">
				<app-control-button v-for="button in transportButtons" :key="button.id" v-bind:myButton="button"></app-control-button>
			</div>
		</div>
	</div>
</template>

<script>

import ControlButton from '@/components/control/ControlButton'

export default {
	data() {
		return {
			deviceButtons: [
				{id: 1, name: '主机：开', action: 'poweron'},
				{id: 2, name: '主机：关', action: 'poweroff'},
				{id: 3, name: '投影：开', action: 'projectoron'},
				{id: 4, name: '投影：关', action: 'projectoroff'}
			],
			transportButtons: [
				{id: 1, name: '音量：加', action: 'volumeup'},
				{id: 2, name: '音量：减', action: 'volumedown'},
				{id: 3, name: '播放', action: 'play'},
				{id: 4, name: '暂停', action: 'pause'},
				{id: 5, name: '停止', action: 'stop'}
			],
		}
	},
	components: {
		appControlButton: ControlButton
	}
}
</script>

<style lang="css">
</style>
