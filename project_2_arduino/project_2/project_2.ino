bool jPressed; //j stands for joystick
int xPos;
int yPos;
int bPressed; //b stands for button
int pValue; //potentiometer value

const int jPressPin = 25;
const int xPosPin = 27;
const int yPosPin = 26;
const int bPin = 2;
const int pPin = 33; //potentiometer

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("Hello, ESP32!");
}

void loop() {
  delay(1000); // this speeds up the simulation
  if( analogRead(jPressPin) == 0){
    jPressed = true;
  }
  else{
    jPressed = false;
  }
  if( analogRead(bPin) == 0){
    bPressed = true;
  }
  else{
    bPressed = false;
  }
  xPos = analogRead(xPosPin);
  yPos = analogRead(yPosPin);
  pValue = analogRead(pPin);
  String toPrint = "{";
  toPrint = toPrint + "\"x\": " + String(xPos) + ", ";
  toPrint = toPrint + "\"y\": " + String(yPos) + ", ";
  toPrint = toPrint + "\"jPressed\": " + String(jPressed) + ",";
  toPrint = toPrint + "\"bPressed\": " + String(bPressed) + ",";
  toPrint = toPrint + "\"pValue\": " + String(pValue) + "}";
  Serial.println(toPrint);
  
}
