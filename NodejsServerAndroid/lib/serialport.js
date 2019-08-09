const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;

// 아두이노와 시리얼 통신 연결 객체 생성
const port = new Serialport("COM9", {
  baudRate: 9600
}, function(err){
  if(err){
    console.log('Arduino 연결 객체 생성 에러', err.message);
  }else{
    console.log('Arduino 연결 객체 생성 성공');
  }
});

// 연결이 성공하면 발생하는 이벤트
port.on('open', function(){
  console.log('Arduino가 연결되어 serialport open 이벤트 발생');
})

// Arduino에서 data가 넘어올 때 발생하는 이벤트
let arduinoData, arduinoLED, arduinoLight;
var parser = port.pipe(new Readline({delimiter: '\r\n'}));  // serialport pipe 연결

parser.on('data', function(data){
  arduinoData = data;
  // 넘어온 data가 led인지 light sensor인지 구분하여 처리
  if(data.substring(0,3)=='led'){
    arduinoLED = data;
  }else if(data.substring(0,3)=='Lig'){
    arduinoLight = data.substring(5, 8);
  }
});

// 아두이노로 LED 제어 데이터를 전송하는 함수.
exports.ledCtrl = function(command){
  port.write(command+'\n', function(err){
    if(err){
      console.log('port.write 에러 발생 : ', err.message);
    }
  });
}

// 아두이노에서 LED의 상태 데이터를 가져오는 함수.
exports.ledState = function(){
  let ledState = arduinoLED;
  var ledStateArray = new Array(false, false, false);  // led의 상태를 저장한 배열
  if(ledState !== undefined){
    var result = ledState.substring(9, 12);  //3개의 LED의 상태를 나타내는 숫자 3개만 추출
    console.log(`ledState : ${result}`);

    for(var i=0; i<3; i++){
      ledStateArray[i] = (result[i]=='1');
    }
    console.log('ledStateArray : ', ledStateArray);
  }
  return ledStateArray;
}

// 조도센서값을 반환하는 함수
exports.lightSensorValue = function(){
  let lightSensorValue = arduinoLight;
  if(lightSensorValue !== undefined){
    return lightSensorValue;
  }
}


