"use strict";
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

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

server.listen(process.env.PORT || 3000);

/*                  */
/* WEBSOCKET SERVER */
/*                  */
const wss = new WebSocket.Server({ server });

let rooms = [
  // {
  //   number: '666',
  //   next: 'X',
  //   users: [{ws: {...}, mark: 'X'}]
  //   board: ...
  // },
  // {
  //   number: '777',
  //   next: 'O',
  //   users: [{ws: {...}, mark: 'X'}, {ws: {}, mark: 'O'}]
  //   board: ...
  // }
  
];

wss.on('connection', (ws) => {
  console.log('CONNECTION');

  ws.on('message', (req) => {
    console.log('MESSAGE');
    req = JSON.parse(req);
    console.log(req);

    ws.send(JSON.stringify("hello"));
    
  });

  ws.on('close', (e) => {
    console.log('CLOSING');
  });
});
