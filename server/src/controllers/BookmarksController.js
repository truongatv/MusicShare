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
			console.log("bookmark",bookmark)
			res.send(bookmark)
		} catch (err){
			res.status(500).send({
				error: 'An error has occured trying to fetch the bookmarks'
			})
		}
	}
}