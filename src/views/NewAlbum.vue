<template>
  <section class="page">
    <page-header title="New Album" />
    <main class="page-content">
      <input type="text" v-model="albumName">
			<button @click="saveAlbum">Save</button>
    </main>
  </section>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";

export default {
  name: "NewAlbum",
  components: {
    PageHeader,
  },
	
	data() {
		return {
			albumName: null,
			// albums: null
		}
	},

	// computed: {
	// 	albums() {
	// 		return this.$store.state.albums;
	// 	}
	// },

	// mounted() {
	// 	let albums = this.$store.state.albums;
	// 	if(albums != null) {
	// 		this.albums = albums;
	// 		this.selectedAlbums = this.albums.map((album) => album.id);	
	// 	}
	// },

	methods: {
		saveAlbum() {
			if(this.albumName.length > 0) {
				this.$root.$emit('saved', this.albumName)
				this.$router.push({name:'Photo'})
				// this.$router.go(-1)
			}
		}
	}
};
</script>