import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import Camera from '@/views/Camera.vue'
import Gallery from '@/views/Gallery.vue'
import Album from '@/views/Album.vue'
import Photo from '@/views/Photo.vue'
import ProfileParent from '@/views/ProfileParent.vue'
import ProfileChild from '@/views/ProfileChild.vue'
import SignUp from '@/views/SignUp.vue'
import AddChildren from '@/views/AddChildren.vue'
import NewAlbum from '@/views/NewAlbum.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/camera',
    name: 'Camera',
    component: Camera
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: Album
  },
  {
    path: '/newalbum',
    name: 'NewAlbum',
    component: NewAlbum
  },
  {
    path: '/photo',
    name: 'Photo',
    component: Photo
  },
  {
    path: '/profile',
    name: 'ProfileParent',
    component: ProfileParent
  },
  {
    path: '/child/:id',
    name: 'ProfileChild',
    component: ProfileChild
  },
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/children',
    name: 'AddChildren',
    component: AddChildren
  },
  {
		path: '/:catchAll(.*)', 
		component: NotFound,
		name: 'NotFound'
	}
]

const router = new VueRouter({
	mode: 'history',
  routes: routes
})

export default router
