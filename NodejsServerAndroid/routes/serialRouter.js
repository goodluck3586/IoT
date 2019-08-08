var express = require('express')
var router = express.Router()
var arduino = require('../lib/serialport');

router.get('/ctrl/:command', function(req, res){
  switch(req.params.command){
    case 'led1_on':
      arduino.ledCtrl('led1_on');
      break;
    case 'led1_off':
      arduino.ledCtrl('led1_off');
      break; 
    case 'led2_on':
      arduino.ledCtrl('led2_on');
      break;
    case 'led2_off':
      arduino.ledCtrl('led2_off');
      break; 
    case 'led3_on':
      arduino.ledCtrl('led3_on');
      break;
    case 'led3_off':
      arduino.ledCtrl('led3_off');
      break; 
  }
  res.redirect('/');
})

router.get('/ledState', function(req, res){
  // let ledState = arduino.ledState();
  // if(ledState !== undefined){
  //   var result = ledState.substring(9, 12);
  //   console.log(`ledState : ${result}`);

  //   var ledStateArray = new Array();  // led의 상태를 저장한 배열
  //   for(var i=0; i<3; i++){
  //     ledStateArray.push(result[i]=='1');
  //   }
  //   console.log('ledStateArray : ', ledStateArray);
  // }
  res.redirect('/test');
})

module.exports = router;