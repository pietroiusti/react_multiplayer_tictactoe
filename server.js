"use strict";
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`requested: ${req.url}`);
  if (req.url === '/') {
    fs.readFile('./public/index.html', (err, page) => {
      if (err) {
	res.writeHead(404);
	res.end(JSON.stringify(err));
	return;
      }
      res.writeHead(200);
      res.end(page);
    });
  } else if (req.url === '/public/js/tictactoe.js') {
    fs.readFile('./public/js/tictactoe.js', (err, page) => {
      if (err) {
	res.writeHead(404);
	res.end(JSON.stringify(err));
	return;
      }
      res.writeHead(200);
      res.end(page);
    });
  } else if (req.url === '/public/css/style.css') {
    fs.readFile('./public/css/style.css', (err, page) => {
      if (err) {
	res.writeHead(404);
	res.end(JSON.stringify(err));
	return;
      }
      res.writeHead(200);
      res.end(page);
    });
  }
});

server.listen(3000);
