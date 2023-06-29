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
let time='';
let seats='';
let movielan='';
let movietype='';
let seatnumber='';
let total_adults='';
let total_childeren='';
let foods ='';
let park ='';
let mobile_number='';
let email_id='';
let payment_option='';
let ticket_print='';
let edit='';

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
      case 'time':
        time_int(socket,input);
        break;
      case 'seat':
        seat_Selection(socket,input);
        break;
      case 'movie-language':
        movie_lang(socket,input);
        break;
      case 'movie-type':
        movie_type(socket,input);
        break;
      case 'seat-number':
        seat_number(socket,input);
        break;
      case 'total-adults':
        adults(socket,input);
        break;
      case 'total-children':
        childeren(socket,input);
        break;
      case 'food-service':
        food(socket,input);
        break;
      case 'parking-service':
        parking(socket,input);
        break;
      case 'mobile-number':
        mobile(socket,input);
        break;
      case 'email-id':
        email(socket,input);
        break;
      case 'payment-option':
        payment(socket,input);
        break;
      case 'Ticket':
        ticket(socket,input);
        break;
      case 'edit':
        change(socket,input);
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
  intent="time"
  socket.emit('botmes',intents[3].answers);
  console.log(date);

}
function time_int(socket,input){
  time=input;
  intent='seat'
  socket.emit('botmes',intents[4].answers);
  
  console.log(time);
  
}
function seat_Selection(socket,input){
  seats=input;
  intent='movie-language'
  socket.emit('botmes',intents[5].answers);
  console.log(seats);


}
function movie_lang(socket,input){
  movielan=input;
  intent='movie-type'
  socket.emit("botmes",intents[6].answers);
}
function movie_type(socket,input){
  movietype=input;
  intent='seat-number'
  socket.emit('botmes',intents[7].answers[0]);
}
function seat_number(socket,input){
  seatnumber=input;
  intent='total-adults'
  socket.emit('botmes',intents[8].answers);

}
function adults(socket,input){
  total_adults=input;
  intent='total-children'
  socket.emit('botmes',intents[9].answers);
}
function childeren(socket,input){
  total_childeren=input;
  intent='food-service'
  socket.emit('botmes',intents[10].answers);
}
function food(socket,input){
  foods=input;
  intent='parking-service'
  socket.emit('botmes',intents[11].answers);
}
function parking(socket,input){
  park=input;
  intent='mobile-number'
  socket.emit('botmes',intents[12].answers);
}
function mobile(socket,input){
  mobile_number=input;
  intent='email-id'
  socket.emit('botmes',intents[13].answers);
}
function email(socket,input){
  email_id=input;
  intent='payment-option'
  socket.emit('botmes',intents[14].answers);
}
function payment(socket,input){
  payment_option=input;
  intent='Ticket'
  socket.emit('botmes',intents[15].answers);
}
function ticket(socket,input){
  ticket_print=input;
  intent='edit'
  socket.emit('botmes',intents[16].answers);
}
function change(socket,input){
  edit=input;
  console.log(edit);
}
function fallback() {
  // Fallback logic goes here
}
