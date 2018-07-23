<template lang="html">
	<div>
		<app-video-groups :themes="getThemes" @themechange="selectedTheme = $event"></app-video-groups>
		<app-videos :videos="getVideos"></app-videos>
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
			selectedTheme: 'Panel1',
			folder: [
				{ id: 1, name: 'Intro', theme:'Panel1' },
				{ id: 2, name: 'Sakura', theme:'Panel1' },
				{ id: 3, name: 'Ocean', theme:'Panel1' },
				{ id: 4, name: 'Planet', theme:'Panel1' },
				{ id: 5, name: 'Froest', theme:'Panel1' },
				{ id: 6, name: 'Galaxy', theme:'Panel1' },
				{ id: 7, name: 'Shuimo', theme:'Panel1' },
				{ id: 8, name: 'CityLight', theme:'Panel1' },
			]
		}
	},
	computed: {
		getThemes: function() {
			var themeArray = this.folder.map(function(video) {return video.theme});
			var themeSet = new Set(themeArray)
			var themes = [];
			for (let theme of themeSet.values()) {
				themes.push(theme)
			}
			return themes;
		},
		getVideos: function() {
			var videoArray = this.folder.filter((video) => {
				return video.theme == this.selectedTheme;
			})
			var videos = videoArray.map((video) => {
				return {name: video.name, id: video.id}
			})
			return videos;
		}
	},
	mounted () {
		// this.getFilenames();
	},
	methods: {
		async getFilenames() {
			const response = await api().get('/load');
			var videos = response.data;
			var folder = [];
			videos.forEach((video) => {
				folder.push({theme: video.name, name: video.video, id: video.id})
			});
			this.folder = folder;
		}
	}
}
</script>

<style lang="css">
</style>
