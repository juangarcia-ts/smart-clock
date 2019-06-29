//Bibliotecas
#include <SoftwareSerial.h>
#include "SevSeg.h"
#include <Wire.h>
#include "RTClib.h"

//Constantes
#define BUZZER            17
#define POWER_LED         16
#define TX_PORT           14
#define RX_PORT           15
//#define TOUCH_BUTTON    18
#define ALARM_LED         19
#define NOTA_BUZINA       262
#define INTERVALO_BUZINA  2000

//Variáveis
SoftwareSerial BTserial(RX_PORT, TX_PORT);
SevSeg sevseg;
RTC_DS3231 rtc;  
String command = "";
//DateTime alarm = new DateTime();
bool alarm = true;
int pin = 0;
int userPin = 0;

void setup() {
  pinMode(POWER_LED, OUTPUT);
  pinMode(ALARM_LED, OUTPUT);
  
  Serial.begin(9600);   
  Serial.print("Sketch:   ");   
  Serial.println(__FILE__);
  Serial.print("Uploaded: ");   
  Serial.println(__DATE__);     

  BTserial.begin(9600);
 
  if (!rtc.begin()) {
    Serial.println("DS3231 não encontrado");
    while (1);
  }   

  byte hardwareConfig = COMMON_CATHODE; 
  byte numDigits = 4;
  byte digitPins[] = {9, 10, 11, 12};
  byte segmentPins[] = {2, 3, 4, 5, 6, 7, 8};
  bool resistorsOnSegments = true; 
  bool updateWithDelays = false;
  bool leadingZeros = true; 
  bool disableDecPoint = true;
 
  sevseg.begin(hardwareConfig, numDigits, digitPins, segmentPins, resistorsOnSegments, updateWithDelays, leadingZeros, disableDecPoint);
  sevseg.setBrightness(90);
}

void loop() {    
  digitalWrite(POWER_LED, HIGH); 
  
  initializeBluetooth();  
  
  DateTime rctNow = rtc.now();

  if (alarm != true) {    
    displayPIN();
    ringAlarm();

    if (pin == userPin) {
      alarm = false;      
    }
  } else {
    displayTime(rctNow);
  }     
} 

void initializeBluetooth() {
  if (BTserial.available() > 0) 
  {  
    while(BTserial.available()) 
    { 
      command += (char)BTserial.read();  
    }  
     
    readCommand(command); 
  }  
  
  if (Serial.available())
  {  
    delay(10);  
    Serial.write(Serial.read());  
    BTserial.write(Serial.read());      
  } 
}

void readCommand(String command) {
  Serial.print(command);
  
  if (command.indexOf("SET_ALARM:") {
    Serial.write("1");
  } else if (command.indexOf("DISMISS_ALARM:") {
    Serial.write("2");
  }

  command = "";
}

void displayTime(DateTime rtcNow) {
  int currentTime = (rtcNow.hour() * 100) + rtcNow.minute();  

  sevseg.setNumber(currentTime, 2);
  sevseg.refreshDisplay(); 
}

void displayPIN() {
  if (pin == 0) {
    pin = random(1,9999);
  }
    
  sevseg.setNumber(pin, 0);
  sevseg.refreshDisplay(); 
}

void ringAlarm() {
  tone(BUZZER, NOTA_BUZINA, INTERVALO_BUZINA);  
  noTone(BUZZER);
}
