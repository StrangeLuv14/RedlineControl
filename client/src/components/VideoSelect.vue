<template lang="html">
	<div class="card border-0">
		<img class="card-img" :src="video.thumbnail" alt="">
		<div class="card-img-overlay pt-0 pl-0 pr-0" @click="playVideo(video.id)">
			<div class="bg-dark" style="opacity:0.7">
				<h5 class="card-title text-white text-left p-2">{{ video.name.split('.')[0] }}</h5>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import api from '@/services/api'

export default {
	name: 'VideoSelect',
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
