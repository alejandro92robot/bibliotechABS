// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.

  Serial.begin(9600); // Begen listening on port 9600 for serial
  
  pinMode(13, OUTPUT);

  digitalWrite(13, HIGH);
}

// the loop function runs over and over again forever
void loop() {

   if(Serial.available() > 0) // Read from serial port
    {
      char ReaderFromNode; // Store current character
      ReaderFromNode = (char) Serial.read();
      convertToState(ReaderFromNode); // Convert character to state  
    }
  delay(1000); 
}

void convertToState(char chr) {
  if(chr=='w'){
    digitalWrite(13, HIGH);
    delay(100); 
  }
  if(chr=='t'){
    digitalWrite(13, LOW);
    delay(100); 
  }
}