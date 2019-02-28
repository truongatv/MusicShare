const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const NotesController = require('./controllers/NotesController')

module.exports = (app) => {
	app.post('/register',
		AuthenticationControllerPolicy.register,
		AuthenticationController.register
	),
	app.post('/login',
		// AuthenticationControllerPolicy.login,
		AuthenticationController.login
	),
	app.get('/songs',
		SongsController.index
	),
	app.post('/songs',
		SongsController.post
	),
	app.get('/songs/:songId',
		SongsController.show
	),
	app.put('/songs/:songId',
    	SongsController.put
    ),
    app.get('/bookmarks',
    	BookmarksController.index
    ),
    app.post('/bookmarks',
    	BookmarksController.post
    ),
    app.delete('/bookmarks/:userId/:bookmarkId',
    	BookmarksController.delete
    ),
    /*
    router for notes
     */
    app.get('/notes',
    	NotesController.index
    ),
    app.post('/create-note',
    	NotesController.create
    )
}