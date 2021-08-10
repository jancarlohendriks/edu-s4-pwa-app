<template>
	<section class="page">
		<main class="page-content">
				<!-- Intro -->
				<section class="camera__intro" id="intro"  v-if="!stream">
					<button @click="startCamera">Allow Access</button>
				</section>
				<!-- Download -->
				<transition name="download" mode="out-in">
					<section class="camera__download" v-if="photo" :key="photo">
						<img :src="photo.toDataURL('image/jpeg')" alt="Photo">
					</section>
				</transition>
				<!-- Video -->
				<video class="camera__video" ref="video" autoplay muted playsinline></video>
		</main>
	</section>
</template>

<script>
import loadImage from 'blueimp-load-image'
export default {
	data() {
		return {
			stream: null,
			ready: false,
			photo: null,
		}
	},

	created() {
		this.startCamera();
	},

	mounted() {
		this.$root.$on('capturePhoto', this.capturePhoto);
	},
	
	methods: {
		
		async startCamera() {
			let stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					facingMode: 'environment'
				}
			})
			
			this.$store.commit('SET_STREAM', stream)
			// this.$root.$emit('capturedImage', stream)
			this.stream = this.$store.state.stream
			
			this.$refs.video.srcObject = this.$store.state.stream
			
			this.$refs.video.onloadedmetadata = () => {
				this.ready = true
			}
			
			this.$refs.video.onended = () => {
				this.ready = false
				this.stream = null
			}
		},
		
		capturePhoto() {
			let video = this.$refs.video
			
			let videoCanvas = document.createElement('canvas')      
			videoCanvas.height = video.videoHeight
			videoCanvas.width = video.videoWidth      
			let videoContext = videoCanvas.getContext('2d')
			
			videoContext.drawImage(video, 0, 0)

			let imageData = videoCanvas.toDataURL();
			this.$store.commit('SET_CAPTURED', imageData)
			
			this.photo = loadImage.scale(videoCanvas, {
				maxHeight: 1080,
				maxWidth: 1080,
				cover: true,
				crop: true,
				canvas: true
			})

		},
		
		downloadPhoto() {
			this.photo.toBlob(blob => {
				let data = window.URL.createObjectURL(blob)
				let link = document.createElement('a')

				link.href = data
				link.download = "photo.jpg"
				link.click()
			}, 'image/jpeg')
		}

	}
}
</script>