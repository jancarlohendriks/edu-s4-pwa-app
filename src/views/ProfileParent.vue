<template>
  <section class="page">
    <page-header title="Profile" />
    <main class="page-content">
      <div class="image-circle --lg">
        <img :src="profile.image" alt="" />
        <h3 class="image-circle__title">{{ profile.name }}</h3>
        <span class="image-circle__sub-title">{{ profile.role }}</span>
      </div>
      <div class="children">
        <h3 class="children__title">My children</h3>
				<div class="image-circle__group">
					<router-link
					class="image-circle"
					v-for="(child, index) in children" :key="index"
					:to="{ name: 'ProfileChild', params: { id: child.id } }"
					>
						<img :src="child.image" :alt="child.name" />
						<h3 class="image-circle__title">{{ child.name }}</h3>
					</router-link>
        </div>
      </div>
			<hr>
			<router-link :to="{name:'SignUp'}" custom v-slot="{ navigate }">
        <button @click="navigate" @keypress.enter="navigate" role="link">
          Sign Out
        </button>
      </router-link>
			<button @click="deleteAccount">Delete Account</button>
    </main>
  </section>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";

export default {
  name: "ProfileParent",
  components: {
    PageHeader,
  },

	methods: {
		deleteAccount() {
			localStorage.removeItem('store')
			this.$forceUpdate()
			this.$router.push({ name: "SignUp" });
		}
	},

	computed: {
		profile() {
			return this.$store.state.profile;
		},
		children() {
			return this.$store.state.children;
		}
	}

};
</script>