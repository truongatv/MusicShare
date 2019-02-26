import Api from '@/services/Api'

export default {
	index (bookmark) {
	    return Api().get('bookmarks', {
	      params: bookmark
	    })
	 },
	post (bookmark) {
	    return Api().post('bookmarks', bookmark)
	},
	delete (userId, bookmarkId) {
	    return Api().delete(`bookmarks/${userId}/${bookmarkId}`)
	 }
}