const {Song} = require('../models')

module.exports = {
	async index (req, res) {
		try {

			let song = null
			const search = req.query.search
			if(search) {
				console.log(search)
				songs = await Song.findAll({
		          where: {
		            $or: [
		              'title', 'artist', 'genre', 'album'
		            ].map(key => ({
		              [key]: {
		                $like: `%${search}%`
		              }
		            }))
		          }
				})
				res.send(songs)
			} else {
				songs = await Song.findAll({
					limit: 10
					})
				res.send(songs)
			}
		} catch (err){
			res.status(500).send({
				error: 'An error has occured trying to fetch the songs'
			})
		}
	},
	async post (req, res) {
	    try {
	      const song = await Song.create(req.body)
	      res.send(song)
	    } catch (err) {
	      res.status(500).send({
	        error: 'an error has occured trying to create the song'
	      })
	    }
	},
	async show (req, res) {
	    try {
	      const song = await Song.findById(req.params.songId)
	      res.send(song)
	    } catch (err) {
	      res.status(500).send({
	        error: 'an error has occured trying to get info the song'
	      })
	    }
	},
	async put (req, res) {
	    try {
	      await Song.update(req.body, {
	        where: {
	          id: req.params.songId
	        }
	      })
	      res.send(req.body)
	    } catch (err) {
	      res.status(500).send({
	        error: 'an error has occured trying to update the song'
	      })
	    }
	}
}