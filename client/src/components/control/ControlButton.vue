<template lang="html">
      <button
	  	type="button"
	  	@click="control(myButton.action)"
	  	class="btn btn-secondary btn-dark text-white-50 border border-secondary m-1">
	  	{{ myButton.name }}
  	</button>
</template>

<script>
/* eslint-disable */
import api from '@/services/api'

export default {
	name: 'ControlButton',
	props: ['myButton'],
	methods: {
		control: function (action) {
		  console.log(action)
			api().post('/control/' + action)
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(`Error: ${error}`);
			});
		}
	}
}
</script>

<style lang="css">
</style>
