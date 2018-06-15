<template lang="html">
	<nav class="navbar navbar-expand-sm col pt-3 pb-3">
		<div class="navbar-collapse">
	  	  <ul class="navbar-nav col">
			  <app-video-group
	  		v-for="theme in themes" :theme="theme"
	  		:key="theme.id"
	  		 @click.native="$emit('themechange', theme.name)"
	  		></app-video-group>
	  	  </ul>
	    </div>

	</nav>

</template>

<script>
/* eslint-disable */
import VideoGroup from '@/components/video/VideoGroup'

export default {
	props: ['themes'],
	mounted () {
		$(".rl-nav-item").addClass("nav-item col bg-secondary border-left border-right pl-0 pr-0")
		$(".rl-nav-link").addClass("nav-link text-white text-center h4")
	},
	components: {
		appVideoGroup: VideoGroup
	}
}
</script>

<style lang="css">
</style>
