<template>
  <div id="app">
    <router-view />
    <Menu />
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";

export default {
  components: {
    Menu,
  },

  // created() {
  //   if (this.$route.name != "Camera") {
  //     let stream = this.$store.state.stream;
	// 		if(stream != null) {
	// 			let tracks = stream.getTracks();
	// 			tracks.forEach((track) => track.stop());
	// 		}
  //   }
  // },
};
</script>
