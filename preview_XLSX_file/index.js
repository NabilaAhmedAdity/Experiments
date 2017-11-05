const express = require('express');
const app = express(); 
const server = require('http').createServer(app);
const path = require('path');
const rootPath = __dirname;

app.set('port', 3000);
app.use('/public', express.static(path.join(rootPath, '/public')));

app.get('/', function(req, res) {
	//return res.status(404).send('Page not found\n');
	return res.sendfile('./public/index.html');
});

app.get('/file.xlsx', function(req, res) {
	return res.sendFile(path.join(rootPath, './public/nsu.xlsx'));
});

server.listen(app.get('port'), function() {
	console.log(`Server running at port ${app.get('port')}`);
});