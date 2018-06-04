<template lang="html">
	<li class="rl-nav-item">
		<a class="rl-nav-link" href="#">{{ tab.title }}</a>
	</li>
</template>

<script>
/* eslint-disable */
export default {
	name: 'NavTab',
	props: ['tab'],
	mounted () {
		$(".rl-nav-item").addClass("nav-item col bg-secondary border-left border-right pl-0 pr-0")
		$(".rl-nav-link").addClass("nav-link text-white text-center h4")
	}
}
</script>

<style lang="css">
</style>
