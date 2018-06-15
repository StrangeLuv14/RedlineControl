<template lang="html">
	<nav class="navbar navbar-expand-sm col pt-3 pb-3">
		<div class="navbar-nav col">
			<app-video-group v-for="(theme, index) in themes" :key="index" :theme="theme" @click.native="$emit('themechange', theme)"></app-video-group>
		</div>
	</nav>
</template>

<script>
/* eslint-disable */
import VideoGroup from '@/components/video/VideoGroup.vue'

export default {
	props: ['themes'],
	components: {
		appVideoGroup: VideoGroup
	}
}
</script>

<style lang="css">
</style>
