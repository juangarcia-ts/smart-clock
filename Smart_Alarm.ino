//Bibliotecas
#include "SevSeg.h"
#include <Wire.h>
#include "RTClib.h"

SevSeg sevseg;
RTC_DS3231 rtc;

//Constantes
#define BUZZER            14
#define POWER_LED         15
#define ALARM_LED         19
#define NOTA_BUZINA       262
#define INTERVALO_BUZINA  2000

void setup() {
  pinMode(POWER_LED, OUTPUT);
  pinMode(ALARM_LED, OUTPUT);
  
  Serial.begin(9600);  

  if (!rtc.begin()) {
    Serial.println("DS3231 não encontrado");
    while (1);
  }   

  byte hardwareConfig = COMMON_CATHODE; 
  byte numDigits = 4;
  byte digitPins[] = {9, 10, 11, 12};
  byte segmentPins[] = {2, 3, 4, 5, 6, 7, 8, 13};
  bool resistorsOnSegments = true; 
  bool updateWithDelays = false;
  bool leadingZeros = true; 
  bool disableDecPoint = false;
 
  sevseg.begin(hardwareConfig, numDigits, digitPins, segmentPins, resistorsOnSegments, updateWithDelays, leadingZeros, disableDecPoint);
  sevseg.setBrightness(0);
}

void loop() {    
  digitalWrite(POWER_LED, HIGH);
  digitalWrite(ALARM_LED, HIGH);

  DateTime now = rtc.now();
  int currentTime = (now.hour() * 100) + now.minute();  

  sevseg.setNumber(currentTime, 2);
  sevseg.refreshDisplay(); 
  
  //tone(BUZZER, NOTA_BUZINA, INTERVALO_BUZINA);
  noTone(BUZZER);
} 
