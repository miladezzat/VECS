#include<dht.h>
dht DHT;
# define trem ','
# define pc_2 2
# define pc_3 3
# define pc_4 4 
# define pc_5 5
# define pc_6 6
# define pc_7 7
# define pc_8 8
# define pc_9 9 
# define pc_10 10
 
#define mq A1
#define lm A0
#define dht 8




char deviceNumber;
String deviceStatus,swap, programStatus="OFF";

void setup() {
  pinMode(pc_2, OUTPUT);pinMode(pc_3, OUTPUT);pinMode(pc_7, OUTPUT);
  pinMode(pc_4, OUTPUT);pinMode(pc_5, OUTPUT);pinMode(pc_6, OUTPUT);
  pinMode(pc_8, OUTPUT);pinMode(pc_9, OUTPUT);pinMode(pc_10, OUTPUT);
  
  Serial.begin(9600);
}



void loop() { 
  
  // ********************SENSORS***********************
  //SENSOR MQ
  float value =analogRead(mq);      //value of air quality 
  Serial.print("airQ: ");
  Serial.println(value ,1);
    
 /* if(value >=80)
 {
  
    digitalWrite(pc_7,HIGH);            //turn on the alarm for evacuation the factory 
    digitalWrite(pc_2,LOW);
    digitalWrite(pc_3,LOW);           //turn off all machines 
     
    }*/


  //SENSOR LM

    float temp =analogRead(lm);              //the temperature of the room 
    temp=(temp *0.48828125)-10;
    Serial.print("temp:");
    Serial.println (temp ,1);
    //delay (3000);
   /* if(temp >=30)
    {
       digitalWrite(pc_4,LOW);         // turn off the machin 4 which produce mor temperature 
      digitalWrite(pc_5,HIGH);        // turn on the air condition    
      
      }*/

      
                                    // SENSOR DHT
      int x=DHT.read11(dht);
      Serial.print("humi:");                          //humidity of the room 
      float humi=DHT.humidity;
      Serial.println(humi,1);
       // Serial.print("DHT_temp:");                    // temperature of room
       // float dtemp=DHT.temperature;
       //Serial.println(dtemp ,1);
       //delay(4000);
      /* if ( humi>=20)
       {
        digitalWrite(pc_4,LOW);         // turn off the machin 4 which produce more humitidy  
        digitalWrite(pc_5,HIGH);        // turn on the air condition 
        }*/

    delay(500);

// ********************DEVICES***********************
while(Serial.available() > 0){
    deviceStatus = Serial.readStringUntil(trem);
    
    if(deviceStatus == "start"){       
        programStatus = "ON";
      }

      if (programStatus == "ON"){
        deviceNumber = swap.charAt(0);
        switch(deviceNumber){
          case '2':{
            if(deviceStatus == "on"){
               digitalWrite(pc_2,HIGH);
              } else if(deviceStatus == "off"){
                digitalWrite(pc_2,LOW);
                } 
            break;
          }
        case '3':{
            if(deviceStatus == "on"){
                digitalWrite(pc_3,HIGH);
              } else if(deviceStatus == "off"){
                digitalWrite(pc_3,LOW);
                }
            break;
          }
        case '4':{
            if(deviceStatus == "on"){
                digitalWrite(pc_4,HIGH);
              } else if(deviceStatus == "off"){
                digitalWrite(pc_4,LOW);
                }
            break;
          }
        case '5':{
            if(deviceStatus == "on"){
                digitalWrite(pc_5,HIGH);
              } else if(deviceStatus == "off"){
                 digitalWrite(pc_5,LOW);
                }
            break;
          }
        case '6':{
            if(deviceStatus == "on"){
                digitalWrite(pc_6,HIGH);
              } else if(deviceStatus == "off"){
                  digitalWrite(pc_6,LOW);
                }
            break;
          }
        case '7':{
            if(deviceStatus == "on"){
                digitalWrite(pc_7,HIGH);
              } else if(deviceStatus == "off"){
                  digitalWrite(pc_7,LOW);
                }
            break;
          }
          case '9':{
            if(deviceStatus == "on"){
                digitalWrite(pc_9,HIGH);
              } else if(deviceStatus == "off"){
                  digitalWrite(pc_9,LOW);
                }
            break;
          }           
        }
        swap = deviceStatus;
        
        } else if (programStatus ="OFF"){
            Serial.println("Program was Stoped, Please enter the word 'start'");
          }
    }

}


