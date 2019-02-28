import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Index'
import CreateSong from '@/components/CreateSong'
import EditSong from '@/components/EditSong'
import ViewSong from '@/components/ViewSong/Index'
import ViewNote from '@/components/Notes/Index'
import CreateNote from '@/components/Notes/Create'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'songs-create',
      component: CreateSong
    },
    {
      path: '/songs/:songId',
      name: 'ViewSong',
      component: ViewSong
    },
    {
      path: '/songs/:songId/edit',
      name: 'song-edit',
      component: EditSong
    },
    /*
    router for notes
     */
    {
      path: '/notes',
      name: 'notes',
      component: ViewNote
    },
    {
      path: '/create-note',
      name: 'create-note',
      component: CreateNote
    },
    /*
    // will match everything
     */
    {
      path: '/*',
      redirect: 'songs'
    },
  ]
})
