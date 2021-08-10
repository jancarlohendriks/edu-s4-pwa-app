<template>
  <section class="page">
    <page-header title="Gallery" />
    <main class="page-content">
      <div class="children --centered">
        <div class="image-circle__group">
          <div
						@click="toggleChild(index)"
            v-for="(child, index) in children"
            class="image-circle" :class="selected.includes(index) ? null : 'inactive'"
            :key="index">
            <img :src="child.image" :alt="child.name" />
            <h3 class="image-circle__title">{{ child.name }}</h3>
          </div>
        </div>
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
  name: "Gallery",
  components: {
    PageHeader,
    AlbumPreview,
  },

  data() {
    return {
			selected: [],
    };
  },
	
	methods: {
		toggleChild(childIndex) {
			if(this.selected.includes(childIndex)) {
				this.selected = this.selected.filter(selectedIndex => selectedIndex !== childIndex)
			} else {
				this.selected.push(childIndex)
			}
		}
	},

  mounted() {
		this.selected = this.children.map(child => child.id)
  },

	computed: {
		filteredAlbums() {
			let albums = this.$store.state.albums;
			return albums.filter((album) => {
        return (album.childrenIds.filter((childId) => {
						return this.selected.includes(childId)
          }).length > 0
        );
      })
    },

		children() {
      return this.$store.state.children;
    },

	}

};
</script>