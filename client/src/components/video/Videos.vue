<template lang="html">
	<div class="card-columns" :style="{'column-count': 2}">
		<app-video
		v-for="video in videos"
		:key="video.id"
		:video="video"
		></app-video>
	</div>
</template>

<script>
/* eslint-disable */
import Video from '@/components/video/Video'

export default {
	props: ['videos'],
	components: {
		appVideo: Video
	}
}
</script>

<style lang="css">
</style>
