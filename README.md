NodejsServerAndroid

1. Arduino

 가. 회로 구성
  - Arduino에 제어할 LED(3개)와 조도센서를 연결한다.
 나. 제어 코드 작성
  - socketIOSerialTestWithString.ino



2. Node.js

 가. Arduino 제어 : (./lib/serialport.js)
   - serialport 모듈을 사용하여 node.js와 arduino가 시리얼 통신이 되도록 만든다.
   - ledCtrl : 연결된 3개의 led를 제어하는 함수
   - ledState : 연결된 3개의 led의 상태값을 가져오는 함수
   - lightSensorValue : 연결된 조도 센서값을 가져오는 함수
   - Arduino의 Led제어가 조도센서값이 필요한 곳에서 사용
   
 나. Node 서버 구성
   - Express 웹 서버 사용
   - ejc view engine 사용
   - Socket.io를 이용하여 클라이언트와 통신
    
 다. 클라이언트
   - BootStrap 템플릿 활용 : https://startbootstrap.com/themes/sb-admin-2/
   - Socket.io를 이용하여 서버와 통신
    
