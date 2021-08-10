<template>
  <section class="page">
    <page-header title="Photo" />
    <main class="page-content">
      <!-- PHOTO -->
      <div class="photo">
        <div class="photo__image">
          <img :src="photoURL" alt="" />
        </div>
        <div class="photo__description">
          <input v-model='photoName' placeholder="Title" />
          <input v-model='photoLocation' placeholder="Location" />
          <textarea rows="4" v-model='photoDescription' placeholder="Description"></textarea>
        </div>
      </div>
      <!-- CHILDREN -->
      <div class="children">
        <h3 class="children__title">My children</h3>
        <div class="image-circle__group">
          <div
            @click="toggleChild(index)"
            v-for="(child, index) in children"
            class="image-circle"
            :class="selectedChildren.includes(index) ? null : 'inactive'"
            :key="index"
          >
            <img :src="child.image" :alt="child.name" />
            <h3 class="image-circle__title">{{ child.name }}</h3>
          </div>
        </div>
      </div>
      <!-- ALBUMS -->
      <div class="labels">
        <h3 class="labels__title">Albums</h3>
        <ul class="labels__list">
          <router-link
            class="labels__list-item --new"
            :to="{ name: 'NewAlbum' }"
            tag="li"
            >New Album</router-link
          >
          <li
            v-for="(album, index) in albums"
            @click="toggleAlbum(index)"
            class="labels__list-item"
            :class="selectedAlbums.includes(index) ? null : 'inactive'"
            :key="index"
          >
            {{ album.title }}
          </li>
        </ul>
      </div>
			<!-- SAVE -->
      <button @click="savePhoto">Save</button>
    </main>
  </section>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
export default {
  name: "Photo",
  components: {
    PageHeader,
  },

  data() {
    return {
      selectedChildren: [],
      selectedAlbums: [],
			photoLocation: null,
			photoName: null,
			photoDescription: null,
			albums: null,
			photos: [],
    };
  },

  methods: {

		getPhotoName() {
			this.photoName = `Photo #${this.photos.length + 1}`
		},
		
		getPhotoLocation() {
			if (navigator.geolocation) {
				let lat, lng;
				navigator.geolocation.getCurrentPosition((position) => {
					lat = position.coords.latitude
					lng = position.coords.longitude
					
					fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
						.then(response => response.json())
						.then(data => this.photoLocation = data.city)
				});
			}
		},

    updateAlbums(albumTitle) {
			// this.$forceUpdate()
      let album = {
				id: this.albums.length > 0 ? this.albums.length : 0,
        title: albumTitle,
				childrenIds: [0]
      };
			this.albums = this.albums.push(album)
    },

    savePhoto() {
			let newPhoto = {
				id: this.photos.length > 0 ? this.photos.length : 0,
				albumIds: this.selectedAlbums,
				url: this.photoURL,
				name: this.photoName,
				location: this.photoLocation,
				description: this.photoDescription,
				timestamp: new Date()
			}
			this.$store.commit("SET_NEW_PHOTO", [...this.photos, newPhoto]);
			this.saveAlbum
			this.$router.push("Gallery");
    },

    saveAlbum() {
			this.$store.commit("SET_NEW_ALBUMS", this.albums);
      this.$router.push("Gallery");
    },

		toggleChild(childIndex) {
			if(this.selectedChildren.includes(childIndex)) {
				this.selectedChildren = this.selectedChildren.filter(selectedIndex => selectedIndex !== childIndex)
			} else {
				this.selectedChildren.push(childIndex)
			}
		},

    toggleAlbum(albumIndex) {
      if (this.selectedAlbums.includes(albumIndex)) {
        this.selectedAlbums = this.selectedAlbums.filter(
          (selectedIndex) => selectedIndex !== albumIndex
        )
      } else {
        this.selectedAlbums.push(albumIndex);
      }
    },
  },

	beforeCreate() {
		this.$root.$off('saved');
	},

  mounted() {
		let albums = this.$store.state.albums;
		if(albums != null) {
			this.albums = albums;
		}
		
		this.selectedAlbums = this.albums.map((album) => album.id);

		this.selectedChildren = this.children.map(child => child.id)
		
		let photos = this.$store.state.photos;
		if(this.photos != null) {
			this.photos = photos;
		}
		
		this.$root.$on('saved', this.updateAlbums);
		this.getPhotoLocation();
		this.getPhotoName();
  },

  computed: {
		children() {
      return this.$store.state.children;
    },
    photoURL() {
      return this.$store.state.capturedImage;
    },
  },
};
</script>
