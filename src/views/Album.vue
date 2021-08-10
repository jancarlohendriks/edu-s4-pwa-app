<template>
  <section class="page">
    <page-header title="Gallery" />
    <main class="page-content">
      <h2 v-text="album ? album.title : 'No Title'"></h2>
      <div class="album">
        <div class="album__container">
          <div
						@click="openModal(index)"
						v-for="(photo, index) in photos"
            :key="index"
						class="album__item">
						<img :src="photo.url" alt="">
					</div>
        </div>
      </div>
    </main>
		<modal
			:image="photos[photoSelected] ? photos[photoSelected] : null"
			v-show="showModal"
			@close="showModal = false">
		</modal>
  </section>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "Album",
  components: {
    PageHeader,
		Modal
  },

  data() {
    return {
      albumId: this.$route.params.id,
      showModal: false,
			photoSelected: 0
    };
  },

	methods: {
		openModal(index) {
			this.photoSelected = index
			this.showModal = true
		},

		deletePhoto(imageIndex) {
			this.showModal = false;
			let photos = this.$store.state.photos
			photos = photos.filter(function(photo) {
				return photo.id !== imageIndex
			})
			this.$store.commit("SET_NEW_PHOTO", photos);
		}
	},

  computed: {
		photos() {
			return this.$store.state.photos.filter((photo) => photo.albumIds.includes(this.albumId));
		},

    album() {
      return this.$store.state.albums.find((album) => album.id === this.albumId);
    },
  },

	beforeCreate() {
		this.$root.$off('delete');
	},

  mounted() {

		this.$root.$on('delete', this.deletePhoto);

    if (!this.album) {
      this.$router.push({ name: "Gallery" });
    }
  },
};
</script>