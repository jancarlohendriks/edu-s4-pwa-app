<template>
  <section class="page">
    <main class="page-content">
      <header>
        <h1>Sign Up</h1>
      </header>
      <div v-for="(child, index) in children" :key="index">
        <div class="image-circle">
          <img :src="child.image" alt="" />
        </div>
        <div>
          <label :for="'fileInput__'+ index">New Image</label>
          <input
            @change="handleFiles($event, index)"
            type="file"
            :id="'fileInput__'+ index"
            ref="fileElem"
            multiple
            accept="image/*"
            hidden
          />
        </div>
        <input type="text" placeholder="Name" v-model="child.name" />
        <input type="text" placeholder="birthday" v-model="child.birthday" />
        <button @click="removeRow(index)">X</button>
        <br /><br />
      </div>
      <div>
        <button @click="addRow">Add Child</button>
      </div>
      <hr />
      <button @click="saveChildren">Save</button>
    </main>
  </section>
</template>

<script>
export default {
  name: "AddChildren",

  data() {
    return {
      children: [
        {
          name: null,
          birthday: null,
					image: null
        },
      ],
    };
  },

  methods: {
		handleFiles(e, index) {
			let file = e.target.files[0]
			const reader = new FileReader();
			reader.addEventListener("load", () => {
					this.children[index].image = reader.result;
			}, false);
			reader.readAsDataURL(file);
			// this.children[index].image = URL.createObjectURL(this.$refs.fileElem[index].files[0])
    },

    addRow() {
      this.children.push({
        id: this.children.length,
        name: "",
        birthday: "",
				image: null
      });
    },
    removeRow(index) {
      this.children.splice(index, 1);
    },
    saveChildren() {
      this.$store.commit("SET_CHILDREN", this.children);
      this.$router.push({ name: "Gallery" });
    },
  },

  mounted() {
    let children = this.$store.state.children;
    if (children != null) {
      this.children = [...children];
    }
  },
};
</script>
