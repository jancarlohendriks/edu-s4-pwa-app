<template>
	<div class="children" :class="centered ? '--centered' : null">
		<h3 class="children__title" v-if="!centered">
			{{ title }}
		</h3>
		<div class="image-circle__group">
			<div class="image-circle">
				<img src="https://source.unsplash.com/random" alt="">
				<h3 class="image-circle__title">John Doe</h3>
			</div>
			<div class="image-circle">
				<img src="https://source.unsplash.com/random" alt="">
				<h3 class="image-circle__title">John Doe</h3>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Children',
	props: {
		title: String,
		centered: {
			type: Boolean,
			default: false
		}
	}
}
</script>