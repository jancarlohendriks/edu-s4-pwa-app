<template>
	<header class="page-header">
		<div class="page-header__content">
			<span class="page-header__back" @click="$router.go(-1)">Back</span>
			<h3 class="page-header__title">{{ title }}</h3>
		</div>
	</header>
</template>

<script>
export default {
	props: {
		title: String
	}
}
</script>