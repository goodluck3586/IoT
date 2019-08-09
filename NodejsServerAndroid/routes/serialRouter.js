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
});

module.exports = router;