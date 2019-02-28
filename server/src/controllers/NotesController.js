const {
	Note
} = require('../models')
module.exports = {
	async index (req, res) {
		try {
			console.log("test")
		} catch (err){
			res.status(500).send({
				error: 'An error has occured trying to fetch the bookmarks'
			})
		}
	},
	async create (req, res) {
		try {
			const {note, userId} = req.body
			console.log(note)
			const newNote = await Note.create({
				title: note.title,
				content: note.content,
				UserId: userId
			})
			res.send(newNote)			
		} catch (err){
			console.log(err)
			res.status(500).send({
				error: 'An error has occured trying to fetch the bookmarks'
			})
		}
	}
}