var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});


// defining model for Page
// creates table for Pages
var Page = db.define('page', {
	title: Sequelize.STRING,
	urlTitle: Sequelize.STRING,
	content: Sequelize.TEXT,
	status: Sequelize.ENUM('open', 'close') // this is cool - enums, like in C
});

var User = db.define('user', {
	name: Sequelize.STRING,
	email: Sequelize.STRING
})

// export the models
module.exports = {Page, User};