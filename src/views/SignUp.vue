<template>
  <section class="page">
    <main class="page-content">
      <header>
        <h1>Sign Up</h1>
      </header>

			<div class="image-circle --lg">
				<img :src="image" alt="">
			</div>

      <div>
				<label for="fileInput">New Image</label>
        <input
          @change="handleFiles"
          type="file"
					id="fileInput"
          ref="fileElem"
          multiple
          accept="image/*"
					hidden
        />
      </div>

      <div class="form">
        <div class="labels">
          <h3 class="labels__title">I am...</h3>
          <ul class="labels__list">
            <li
              @click="(selectedRole = role), (roleOther = false)"
              v-for="(role, index) in roles"
              :key="index"
              :class="selectedRole == role ? null : 'inactive'"
              class="labels__list-item"
            >
              {{ role }}
            </li>
            <li
              @click="(roleOther = !roleOther), (selectedRole = '')"
              :class="roleOther ? null : 'inactive'"
              class="labels__list-item"
            >
              other
            </li>
          </ul>
        </div>
        <br />
        <input
          v-if="roleOther"
          type="text"
          placeholder="Enter your role"
          class="form__item"
          v-model="selectedRole"
        />
        <input
          type="text"
          placeholder="Enter your name"
          class="form__item"
          v-model="name"
        />
      </div>
      <hr />
      <button @click="signUp">Sign Up</button>
    </main>
  </section>
</template>

<script>
export default {
  name: "SignUp",

  data() {
    return {
      name: null,
      roles: ["mom", "dad"],
      selectedRole: null,
      roleOther: false,
			image: null
    };
  },

  methods: {
    handleFiles(e) {
			let file = e.target.files[0]
			const reader = new FileReader();
			reader.addEventListener("load", () => {
					this.image = reader.result;
			}, false);
			reader.readAsDataURL(file);
			// this.image = URL.createObjectURL(this.$refs.fileElem.files[0])
    },

    signUp() {
      if (this.name != null && this.selectedRole != null) {
        let profile = {
          name: this.name,
          role: this.selectedRole,
					image: this.image
        };
        this.$store.commit("SET_PROFILE", profile);
        this.$router.push({ name: "AddChildren" });
      }
    },
  },

  mounted() {
    let profile = this.$store.state.profile;
    if (profile != null) {
      this.name = this.$store.state.profile.name;
    }
  },
};
</script>
