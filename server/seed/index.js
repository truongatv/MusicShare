const {
  sequelize,
  Song,
  User,
  Bookmark
} = require('../src/models')

const Promise = require('bluebird')
const songs = require('./songs.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')

sequelize.sync({force: true})
	.then(async () => {
		try{
			await Promise.all(
				users.map(user => {
			        User.create(user)
			      })
			)	
		} catch(error){
			console.log(error)
		}
		
		try{
			await Promise.all(
				songs.map(song => {
					Song.create(song)
				})
			)	
		} catch(error) {
			console.log(error)
		}

		try{
			await Promise.all(
				bookmarks.map(bookmark => {
					Bookmark.create(bookmark)
				})
			)	
		} catch(error) {
			console.log(error)
		}
		
	})
