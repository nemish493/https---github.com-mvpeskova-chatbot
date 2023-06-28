const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const json = require('./backend.json');
const intents = json.intents;
const axios = require('axios');
const cors = require('cors');

app.use(cors());

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
let intent = "start";
let movieName='';
let date='';

io.on('connection', (socket) => {
  console.log('connected');

  socket.on('human', (data) => {
    const input = data.toLowerCase();
    
    switch (intent) {
      case 'start':
        processStartIntent(socket, input);
        break;
      case 'book':
        book(socket,input);
        break;
      case 'moviename':
        moviename(socket,input);
        break;
      case 'date':
        date_int(socket,input);
        break;

    }
  });

});

function processStartIntent(socket, input) {
  let match = intents[0].keywords.filter((keyword) =>
    input.includes(keyword)
  );

  if (match.length !== 0) {
    intent ="book";
    socket.emit('botmes', intents[0].answers[0]);
  } else {
    fallback();
  }
}
function book(socket,input){
  let match = intents[1].keywords.filter((keyword) =>
    input.includes(keyword)
  );
  if (match.length !== 0) {
    intent ="moviename";
    socket.emit('botmes', intents[1].answers[0]);
  } else {
    fallback();
  }

}
function moviename(socket,input){
  movieName=input;
  intent="date"
  socket.emit('botmes',intents[2].answers);
  console.log(movieName);

}
function date_int(socket,input){
  date=input;
  // intent="time"
  socket.emit('botmes',intents[3].answers);
  console.log(date);

}
function fallback() {
  // Fallback logic goes here
}
