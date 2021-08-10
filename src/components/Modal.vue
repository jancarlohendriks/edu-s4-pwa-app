<template>
  <transition name="modal">
    <div class="modal__content">
      <img class="modal__image" :src="image.url" alt="">
      <div class="modal__delete" @click="deletePhoto">Delete</div>
      <div class="modal__close" @click="$emit('close')">Close</div>
			<div class="modal__info">
				<p v-if="image.name">{{ image.name }}</p>
				<p v-if="image.location">{{ image.location }}</p>
				<p v-if="image.description">{{ image.description }}</p>
				<p v-if="image.timestamp">{{ image.timestamp.toLocaleDateString("en-US") + ' - ' + image.timestamp.toLocaleTimeString() }}</p>
			</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
	props: {
		image: Object
	},
	methods: {
		deletePhoto() {
			// this.$emit('close')
			this.$root.$emit('delete', this.image.id)
			// setTimeout(this.$root.$emit('delete'), 3000)
		}
	},
};
</script>