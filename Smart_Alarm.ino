//Bibliotecas
#include <SoftwareSerial.h>
#include "SevSeg.h"
#include <Wire.h>
#include "RTClib.h"

//Constantes
#define TX_PORT           14
#define RX_PORT           15
#define BUZZER            17
#define POWER_LED         16
#define ALARM_LED         19
#define NOTA_BUZINA       2093
#define INTERVALO_BUZINA  10000
#define RTC_DELAY         4

//Variáveis
SoftwareSerial BTserial(RX_PORT, TX_PORT);
SevSeg sevseg;
RTC_DS3231 rtc;
bool hasAlarm = false;
bool isActive = false;
String alarmTime;
int pin = 0;
int userPin = 0;

void setup() {
  pinMode(POWER_LED, OUTPUT);

  Serial.begin(9600);
  Serial.print("Sketch:   ");
  Serial.println(__FILE__);
  Serial.print("Uploaded: ");
  Serial.println(__DATE__);

  BTserial.begin(9600);

  randomSeed(9600);

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
  sevseg.setBrightness(90);
}

void loop() {
  DateTime rtcNow = rtc.now();
  String strNow = String(rtcNow.hour()) + String(rtcNow.minute() - RTC_DELAY);
      
  if (hasAlarm == true && isActive == false && alarmTime.equals(strNow)) {
    BTserial.write("ALARM_ON\r\n");     
    isActive = true;
  }

  if (isActive == true) {
    toggleLed(HIGH);  
    ringAlarm();
    displayPIN();
  } else {
    displayTime(rtcNow);
  }

  startBluetooth();
}

void startBluetooth() {
  String command;
  
  if (BTserial.available()) {
    while (BTserial.available()) {
      command += String(char(BTserial.read()));
    }

    if (command.indexOf("SET:") != -1) {
      alarmTime = command.substring(4, command.length());
      hasAlarm = true;    
    } 

    if (command.indexOf("PIN:") != -1) {
      userPin = command.substring(4, command.length()).toInt();

      if (pin != userPin) {
        BTserial.write("WRONG_PIN\r\n"); 
      } else {
        BTserial.write("ALARM_OFF\r\n"); 
        toggleLed(LOW);      
        hasAlarm = false;
        isActive = false;
        alarmTime = "";
        pin = 0;
      }
    }
  }

  while (Serial.available()) {
    delay(10);
    command = Serial.read();
    BTserial.print(command);
  }
}

void displayTime(DateTime rtcNow) {
  int currentTime = (rtcNow.hour() * 100) + rtcNow.minute() - RTC_DELAY;

  sevseg.setNumber(currentTime, 2);
  sevseg.refreshDisplay();
}

void displayPIN() {
  if (pin == 0) {
    pin = random(1, 9999);
  }

  sevseg.setNumber(pin, 0);
  sevseg.refreshDisplay();
}

void ringAlarm() {
  tone(BUZZER, NOTA_BUZINA, INTERVALO_BUZINA);
  noTone(BUZZER);
}

void toggleLed(int ledStatus) {
  digitalWrite(POWER_LED, ledStatus);   
}
