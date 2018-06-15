<template lang="html">
	<div class="card border-0">
		<img class="card-img" src="/static/img/placeholder.png" alt="">
		<div class="card-img-overlay pt-0 pl-0 pr-0" @click="playVideo(video.id)">
			<div class="bg-dark" style="opacity:0.7">
				<h5 class="card-title text-white text-left p-2">{{ video.name }}</h5>
			</div>
		</div>
	</div>
</template>

<script>
import api from '@/services/api'

export default {
	props: ['video'],
	methods: {
		playVideo: function (id) {
		  console.log(id)
			api().post('/video/' + id, {
				control: id
			})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
		}
	}
}
</script>

<style lang="css">
</style>
