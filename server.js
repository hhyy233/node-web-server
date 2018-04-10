const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware

app.use((req, res, next) => {
	// next is used to tell express that this middleware is done
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log); //logger
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append to server.log.');
		}
	});
	// console.log(req);
	next();
});

// app.use((req, res, next) => {
	// res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));


// Helper
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
}); 
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


// response 
app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!</h1>');
	// res.send({
		// name: 'sss',
		// likes: [
			// 'gg',
			// 'feaf'
		// ]
	// });
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Hello World!'
	});
}); 

app.get('/about', (req, res) => {
	// res.send('About Page');
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to find the page'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
}); // listen to the port

