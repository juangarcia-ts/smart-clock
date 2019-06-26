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
//SoftwareSerial BTserial(RX_PORT, TX_PORT);
SevSeg sevseg;
RTC_DS3231 rtc;

void setup() {
  pinMode(POWER_LED, OUTPUT);
  pinMode(ALARM_LED, OUTPUT);
  //pinMode(TOUCH_BUTTON, INPUT);

  //BTserial.begin(9600);
  Serial.begin(9600);   
  Serial.print("Sketch:   ");   
  Serial.println(__FILE__);
  Serial.print("Uploaded: ");   
  Serial.println(__DATE__);     
 
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

  displayTime();

  //initializeBluetooth();  
  
  //int isButtonPressed = digitalRead(TOUCH_BUTTON);
  
  //if (isButtonPressed == 1) {
  //  digitalWrite(ALARM_LED, HIGH);
  //} 
} 

void displayTime() {
  DateTime now = rtc.now();
  int currentTime = (now.hour() * 100) + now.minute();  

  sevseg.setNumber(currentTime, 2);
  sevseg.refreshDisplay(); 
}

//void initializeBluetooth() {  
//  String command = "";
//
//  // Read device output if available.  
//  if (BTserial.available() > 0) 
//  {  
//     while(BTserial.available()) 
//     { // While there is more to be read, keep reading.  
//       command += (char)BTserial.read();  
//     }  
//   Serial.println(command);  
//   command = ""; // No repeats  
//  }  
//  
//  // Read user input if available.  
//  if (Serial.available())
//  {  
//    delay(10); // The DELAY!  
//    BTserial.write(Serial.read());  
//  } 
//}

void ringAlarm() {
  tone(BUZZER, NOTA_BUZINA, INTERVALO_BUZINA);  
  noTone(BUZZER);
}
