const {User} = require('../models') 
const jwt = require('jsonwebtoken')
const config = require('../config/config') 


function jwtSignUser(user) {
	const ONE_WEEK = 60*60*24*7
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	})
}

module.exports = {
	async register (req, res) {
		try {
		const user = await User.create(req.body)
		res.send(user.toJSON())

		} catch(err) {
			res.status(400).send({
				error: 'This email account is already in user'
			})
		}  
	},
	async login (req, res) {
		try {
			console.log(req.body)
			const {email, password} = req.body
			console.log(email)
			const user = await User.findOne({
				where: {
					email: email
				}
			})
			if(!user) {
				return res.status(403).send({
					error: 'The login infomation was incorrect'
				})
			}
			const isPasswordValid = password === user.password
			// console.log(isPasswordValid, password, user.password)
			if(!isPasswordValid) {
				return res.status(403).send({
					error: 'the password was incorrect'
				})
			}
			res.send({
				user: user.toJSON(),
				token: jwtSignUser(user.toJSON())
			})

		} catch(err) {
			res.status(403).send({
				error: 'an error has occured trying to login'
			})
		}  
	}
}