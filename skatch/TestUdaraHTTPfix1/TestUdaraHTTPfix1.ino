#include <ESP8266WiFi.h>
#include <ESPAsyncWebServer.h>
#include <Hash.h>
#include <ESPAsyncTCP.h>

#define pinSensor A0 // mendefinisikan bahwa pin yang digunakan 
                     // untuk membaca sensor adalah pin A0
                     
int ledPower = 2;
int measurePin = A0;
int samplingTime = 280;
int sleepTime = 100;
 
float voMeasured = 0;
float calcVoltage = 0;
float dustDensity = 0;
float voltDensity = 0;

long RL = 1000; // 1000 Ohm
long Ro = 83; // 83 ohm ( SILAHKAN DISESUAIKAN)

//read sensor Gp2y
String readDustDensity(){
    digitalWrite(ledPower,LOW); // power on the LED
    delayMicroseconds(samplingTime);
     
    voMeasured = analogRead(measurePin); // read the dust value
    digitalWrite(ledPower,HIGH); // turn the LED off
    delayMicroseconds(sleepTime);
     
    calcVoltage = ( ( voMeasured * 5 ) / 1023);
    voltDensity = calcVoltage - 0.6;
    dustDensity = voltDensity * 0.17;
      
    if ( dustDensity < 0){
        dustDensity = 0.00;
    }
    Serial.print("gp2y: ");
    Serial.print(dustDensity);
    Serial.print(",");
    return String(dustDensity);
    delay(1000);
}

//reading sensor Mq7
String readppm(){
    int sensorvalue = analogRead(pinSensor);  // membaca nilai ADC dari sensor
    float VRL= sensorvalue*5.00/1024;         // mengubah nilai ADC ( 0 - 1023 ) menjadi nilai voltase ( 0 - 5.00 volt )
    float Rs = ( 5.00 * RL / VRL ) - RL;      // mengubah nilai VL menjadi nilai Rs
      
    float ppm = 100 * pow(Rs / Ro,-1.53); // ppm = 100 * ((rs/ro)^-1.53);
    if (isnan(ppm)){
        Serial.println("Failed to read from ppm sensor!");
        return "--";
    }
    else{
        Serial.print("co: ");
        Serial.println(ppm);
        return String(" ppm");
    }
    Serial.println();
    delay(1000); 
}

// Replaces placeholder with DHT values
String processor(const String& var){
  //Serial.println(var);
  if(var == "dustDensity"){
    return readDustDensity();
  }
  else if(var == "ppm"){
    return readppm();
  }
  return String();
}

void setup(){
    // Serial port for debugging purposes
    Serial.begin(115200);
  
    pinMode(ledPower,OUTPUT);
  
    Serial.println();
    Serial.print("Connected, IP address: ");
    Serial.println(WiFi.localIP());

    while (true){
        readDustDensity().c_str();
        readppm().c_str();
        delay(1000);
    }
}

  

void loop(){

}
