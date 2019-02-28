const { User } = require('../models')
module.exports = (sequelize, DataTypes) => {
	const Note = sequelize.define('Note', {
		title: DataTypes.STRING,
		content: DataTypes.STRING           
	})
	Note.associate = function(models) {
		Note.belongsTo(models.User)
	}
	return Note
}