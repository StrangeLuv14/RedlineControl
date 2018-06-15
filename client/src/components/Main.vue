
<template lang="html">
	<div class="main">
		<div class="row bg-dark">
			<div class="col-3">
				<logo></logo>
				<app-control-panel></app-control-panel>
			</div>
			<div class="col-9">
				<app-video-panel></app-video-panel>
			</div>

        </div>
	</div>

</template>

<script>
/* eslint-disable */
import Logo from '@/components/Logo'
import ControlPanel from '@/components/control/ControlPanel'
import VideoPanel from '@/components/video/VideoPanel'

export default {
	name: 'Main',
	data: function () {
		return {

		}
	},
	components: {
		Logo,
		appVideoPanel: VideoPanel,
		appControlPanel: ControlPanel
	}
}
</script>

<style lang="css">
</style>
