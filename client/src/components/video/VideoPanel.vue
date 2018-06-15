<template lang="html">
	<div>
		<app-video-groups :themes="themes" @themechange="selectedTheme = $event"></app-video-groups>
		<app-videos :videos="videos"></app-videos>
		<div class="">
			{{selectedTheme}}
		</div>
	</div>
</template>

<script>
import Videos from '@/components/video/Videos'
import VideoGroups from '@/components/video/VideoGroups'
import api from '@/services/api'

export default {
	components: {
		appVideos: Videos,
		appVideoGroups: VideoGroups
	},
	data: function() {
		return {
			folder: [
				{
					id: 1,
					name: 'Theme1',
					videos: [{ id: 1, name: 'Video1' },
							 { id: 2, name: 'Video2' }]
				},
				{
					id: 2,
					name: 'Theme2',
					videos: [{ id: 1, name: 'Video3' },
							 { id: 2, name: 'Video4' },
						 	 { id: 3, name: 'Video5' },]
				},
				{
					id: 3,
					name: 'Theme3',
					videos: [{ id: 1, name: 'Video6' }]
				}
			],
			selectedTheme: 'Theme1',
		}
	},
	computed: {
		themes: function() {
			return this.folder.map(function(group) {return {name: group.name, id:group.id}});
		},
		videos: {
			get: function() {
				var videos = {}
				this.folder.forEach((theme) => {
					if (theme.name === this.selectedTheme) {
						videos = theme.videos;
					}
				});
				return videos;
			},
			set: function() {
			}
		}
	},
	mounted () {
		this.getFilenames();
	},
	methods: {
		async getFilenames() {
			const response = await api().get('/load');
			var videoPaths = response.data.relpath
			console.log(videoPaths)
			if (videoPaths !== undefined) {
				var theme = videoPaths.split('/')[0];
				var name = videoPaths.split('/')[1];
				var myVideos = []
				for (var i = 0; i < videoPaths.length; i++) {
					var video = { id: i+1, name: name, }
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
