import Api from '@/services/Api'

export default {
	// index (search) {
	//     return Api().get('songs', {
	//       params: {
	//         search: search
	//       }
	//     })
	//  },
	post(note) {
		return Api().post('create-note', note)
	}
}