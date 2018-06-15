<template lang="html">
	<a class="rl-nav-item rl-nav-link" href="#">{{ theme }}</a>
</template>

<script>
export default {
	props: ['theme'],
	mounted () {
		$(".rl-nav-item").addClass("nav-item col bg-secondary border-left border-right pl-0 pr-0");
		$(".rl-nav-link").addClass("nav-link text-white text-center h4");
	}
}
</script>

<style lang="css">
</style>
