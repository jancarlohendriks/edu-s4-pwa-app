<template>
	<nav v-if="currentRouteName == 'Camera'" class="menu">
		<div class="menu-item" @click="$router.go(-1)">Back</div> |
		<div class="menu-item" @click="$root.$emit('capturePhoto')">Capture</div> |
		<router-link to="/photo" class="menu-item">Continue</router-link>
	</nav>
	<nav v-else class="menu">
		<router-link to="/gallery" class="menu-item" active-class="active">Gallery</router-link> |
		<router-link to="/camera" class="menu-item" active-class="active">Camera</router-link> |
		<router-link to="/profile" class="menu-item" active-class="active">Profile</router-link>
	</nav>
</template>
<script>
export default {
	name: 'Menu',
	computed: {
    currentRouteName() {
			return this.$route.name;
    }
	}
}
</script>