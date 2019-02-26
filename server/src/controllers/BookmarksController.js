const {
  Bookmark,
  Song
} = require('../models')

module.exports = {
	async index (req, res) {
		try {
			const {songId} = req.query
			const {userId} = req.query
			const where = {
		        UserId: userId
		    }
		    if (songId) {
		        where.SongId = songId
		    }
			const bookmark = await Bookmark.findAll({
				where: where
			})
			res.send(bookmark)
		} catch (err){
			res.status(500).send({
				error: 'An error has occured trying to fetch the bookmarks'
			})
		}
	},
	async post (req, res) {
		try {
			const {userId} = req.body
      		const {songId} = req.body
			const bookmark = await Bookmark.findOne({
		        where: {
		          SongId: songId,
		          UserId: userId
		        }
		      })
			console.log(bookmark)
			if(bookmark){
				return res.status('404').send({
					error: "you already have this set as a bookmark"
				})
			}
			const newBookmark = await Bookmark.create({
				SongId: songId,
				UserId: userId
			})
			res.send(newBookmark)
		} catch (err){
			res.status(500).send({
				error: 'an error has occured trying to create the bookmark'
			})
		}
	},
	async delete (req, res) {
		try {
			const {bookmarkId} = req.params
			const {userId} = req.params
			console.log(req.params)
			const bookmark = await Bookmark.findOne({
	        where: {
	          id: bookmarkId,
	          UserId: userId
	        }
	      })
			if(!bookmark){
				return res.status(403).send({
		          error: 'you do not have access to this bookmark'
		        })
			}
			await bookmark.destroy()
			res.send(bookmark)
		} catch (err){
			res.status(500).send({
				error: 'An error has occured trying to delete the bookmark'
			})
		}
	}
}