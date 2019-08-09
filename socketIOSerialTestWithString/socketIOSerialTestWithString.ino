#define LIGHT A3
int ledPin1 = 3;
int ledPin2 = 4;
int ledPin3 = 5;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  pinMode(LIGHT, INPUT);
}

void loop() {
  // 시리얼 통신으로 넘어온 값에 따라 led 제어
  if(Serial.available() > 0){
    String inString = Serial.readStringUntil('\n');
    if(inString == "led1_on")
      digitalWrite(ledPin1, HIGH);
    else if(inString == "led1_off")
      digitalWrite(ledPin1, LOW);
    if(inString == "led2_on")
      digitalWrite(ledPin2, HIGH);
    else if(inString == "led2_off")
      digitalWrite(ledPin2, LOW);
    if(inString == "led3_on")
      digitalWrite(ledPin3, HIGH);
    else if(inString == "led3_off")
      digitalWrite(ledPin3, LOW);

    // led들의 상태 전송
    Serial.println(getLedState()); // 전송되는 문자열 형태: "led_state000\r\n"
//    static unsigned long ledTick = millis();
//    if ( ( millis() - ledTick) > 100 )
//    {
//      Serial.println(getLedState()); // 전송되는 문자열 형태: "led_state000\r\n"
//      ledTick = millis();
//    }
  }

  // A3에 연결된 Light 센서 값을 읽어오는 시간 설정
  static unsigned long tick = millis();
  if ( ( millis() - tick) > 1000 )
  {
    send_light();
    tick = millis();
  }
}

// led들의 상태를 체크하여 문자열로 전송하는 함수
String getLedState(){
  String ledState = "led_state";
  ledState += digitalRead(ledPin1);
  ledState += digitalRead(ledPin2);
  ledState += digitalRead(ledPin3);
//  ledState += "\r\n";  //Serial.print()로 전송하고 "\r\n"를 구분자로 사용할 경우 붙여준다.
  return ledState;
}

// Light 센서값을 읽어서 출력하는 함수
void send_light()
{
  // 센서 값을 읽어온다.
  int value = analogRead(LIGHT);
  int data = map(value, 0, 1023, 1023, 0);
  
  Serial.print(F("Light")); 
  Serial.println(data);
}
