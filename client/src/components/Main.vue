
<template lang="html">
	<div class="main">
		<div class="row">
			<logo></logo>
			<nav class="navbar navbar-expand-sm bg-dark col pt-3 pb-3">
				<div class="navbar-collapse">
					<ul class="navbar-nav col">
						<nav-tab v-for="tab in tabs" :key="tab.id" v-bind:tab="tab"></nav-tab>
					</ul>
				</div>
			</nav>
        </div>
        <div class="row">
            <div class="col-3 bg-dark">
                <div class="col pt-3 pb-3">
                    <h2 class="text-danger text-left pb-3">设备控制</h2>
                    <div class="col btn-group-lg btn-group-vertical">
						<ControlButton v-for="button in deviceButtons" :key="button.id" v-bind:myButton="button"></ControlButton>
                    </div>
                </div>
                <div class="col pt-3 pb-3">
                    <h2 class="text-danger text-left pb-3">播放控制</h2>
                    <div class="col btn-group-lg btn-group-vertical">
						<ControlButton v-for="button in transportButtons" :key="button.id" v-bind:myButton="button"></ControlButton>
                    </div>
                </div>
            </div>
            <div class="col-9 bg-dark">
                <div class="card-deck">
                    <VideoSelect v-for="video in videos" :key="video.id" v-bind:video="video"></VideoSelect>
                </div>
            </div>
        </div>
	</div>

</template>

<script>
/* eslint-disable */
import Logo from '@/components/Logo'
import NavTab from '@/components/NavTab'
import ControlButton from '@/components/ControlButton'
import VideoSelect from '@/components/VideoSelect'
import api from '@/services/api'

export default {
	name: 'Main',
	data: function () {
		return {
			tabs: [
				{id: 1, title: '主题1'},
				{id: 2, title: '主题2'},
				{id: 3, title: '主题3'}
			],
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
			videos: [
				{id: 1, name: '视频1', thumbnail:'/static/img/1.png'},
				{id: 2, name: '视频2', thumbnail:'/static/img/2.png'},
				{id: 3, name: '视频3', thumbnail:'/static/img/3.png'},
				{id: 4, name: '视频4', thumbnail:'/static/img/4.png'},
				{id: 5, name: '视频5', thumbnail:'/static/img/5.png'},
				{id: 6, name: '视频6', thumbnail:'/static/img/6.png'},
			]
		}
	},
	components: {
		Logo,
		NavTab,
		ControlButton,
		VideoSelect
	},
	beforeMount () {

	},
	mounted () {
		this.getFilenames();

		var cards = $(".card")
		for (var i = 0; i < cards.length; i+=2) {
			var cardGroup = cards.slice(i, i+2)
			cardGroup.wrapAll('<div class="row p-3"></div>')
		}
	},
	methods: {
		async getFilenames() {
			const response = await api().get('/load');
			var videoNames = response.data.name
			if (videoNames !== undefined) {
				console.log(videoNames)
				var myVideos = []
				for (var i = 0; i < videoNames.length; i++) {
					var video = { id: i+1, name: videoNames[i], thumbnail: '/static/img/' + videoNames[i].split('.')[0] + '.png'}
					myVideos.push(video)
				}
				//console.log('Browser get video names: ' + myVideos);
				this.videos = myVideos
			} else {
				this.videos = {}
			}

		}
	}
}
</script>

<style lang="css">
</style>
