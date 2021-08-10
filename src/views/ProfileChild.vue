<template>
  <section class="page">
    <page-header title="Profile" />
    <main class="page-content">
			<h2 v-text="child ? child.name : 'No Title'"></h2>
      <div class="image-circle --lg">
        <img :src="child.image" alt="" />
      </div>
			<AlbumPreview
        v-for="(album, index) in filteredAlbums"
        :key="index"
        :albumId="album.id"
        :title="album.title"
      />
    </main>
  </section>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import AlbumPreview from "@/components/AlbumPreview.vue";

export default {
  name: "ProfileChild",
  components: {
    PageHeader,
		AlbumPreview
  },
	
	data() {
		return {
			childId: this.$route.params.id,
		}
	},

	computed: {
		child() {
      return this.$store.state.children.find((child) => child.id === this.childId);
    },

		filteredAlbums: function () {
			let albums = this.$store.state.albums;
			return albums.filter((album) => {
        return (album.childrenIds.filter((childId) => {
						return childId == this.childId
          }).length > 0
        );
      })
    },

	},
};
</script>