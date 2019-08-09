const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const logger = require('morgan');
const path = require('path');
const favicon = require('serve-favicon')
const PORT_NUMBER = 8080;
const androidData = require('./lib/serialport')

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

var serialRouter = require('./routes/serialRouter');

// socket.io를 이용한 통신, socket.io 클라이언트 연결
var sc = io.on('connection', (socket) => {
  var ip = socket.request.connection.remoteAddress;
  console.log('클라이언트 socket 연결 성공', ip);

  socket.on('disconnect', function(){
    console.log('클라이언트 접속 종료');
  });

  // 조도 센서값이 있을 때, 센서값 전송
  setInterval(() => {
    socket.emit('lightSensorValue', androidData.lightSensorValue());
  }, 1000);

  // // led의 상태값이 바로 반영되지 않으므로 1초 뒤에 소켓 통신으로 전송
  // function emitLedState(){
  //   console.log('led 상태값을 소켓통신으로 전송')
  //   setTimeout(() => {
  //     socket.emit('ledState', androidData.ledState());
  //   }, 1000);
  // }
});

var ledStateArray = [false, false, false]  // led의 4개의 상태를 저장하는 배열
app.get('/', function(req, res){
  // res.redirect('/index_arduino.html')
  res.render('index', {'ledStateArray': androidData.ledState()});
  // sc.emitLedState();  // led의 상태값이 바로 반영되지 않으므로 1초 뒤에 소켓 통신으로 전송 - 안됨.
});

app.use('/serial', serialRouter);  // Serial 통신 처리 라우터

app.post('/', function(req, res){
  console.log(req.body)
  res.redirect('/')
})

server.listen(PORT_NUMBER, function(){
  console.log(`${PORT_NUMBER} 포트에서 대기중`);
});