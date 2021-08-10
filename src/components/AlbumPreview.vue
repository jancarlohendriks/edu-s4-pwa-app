<template>
  <div class="album-preview">
    <div class="album-preview__header">
      <h4>{{ album.title }}</h4>
      <span>{{ timestamp }}</span>
    </div>
    <div class="album-preview__container">
      <div
        v-for="(photo, index) in filteredPhotos"
        :key="index"
        class="album-preview__item"
      >
        <img :src="photo.url" alt="" />
      </div>
    </div>
    <div class="album-preview__footer">
      <router-link :to="{ name: 'Album', params: { id: albumId } }"
        >See all</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    albumId: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    filteredPhotos() {
      let photos = this.$store.state.photos;
      return photos
        .filter((photo) => {
          return (
            photo.albumIds.filter((photoId) => {
              return photoId == this.albumId;
            }).length > 0
          );
        })
        .slice(0, 3);
    },

    timestamp() {
      return this.filteredPhotos.length > 0
        ? new Date(
            this.filteredPhotos[this.filteredPhotos.length - 1].timestamp
          ).toLocaleDateString("nl-NL")
        : null;
    },

		album() {
			return this.$store.state.albums.find((album) => album.id === this.albumId);
		},

  },
};
</script>
