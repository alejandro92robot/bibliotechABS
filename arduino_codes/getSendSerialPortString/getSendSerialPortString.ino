#define NUM_ROWS 4
#define NUM_COLS 4

// Definir los pines de las filas y las columnas
int rows[NUM_ROWS] = {6, 7, 8, 9};
int cols[NUM_COLS] = {2, 3, 4, 5};

void setup() {
  Serial.begin(9600);

  // Configurar los pines de las filas como salida
  for (int i = 0; i < NUM_ROWS; i++) {
    pinMode(rows[i], OUTPUT);
    digitalWrite(rows[i], LOW); // Inicialmente apagar los LEDs
  }

  // Configurar los pines de las columnas como salida
  for (int j = 0; j < NUM_COLS; j++) {
    pinMode(cols[j], OUTPUT);
    digitalWrite(cols[j], LOW); // Inicialmente apagar los LEDs
  }
}

void loop() {
  // Esperar a que llegue el comando
  while (!Serial.available()) {
    // Esperar
  }

  // Leer el comando
  String command = Serial.readStringUntil('\n');

 // Procesar el comando
  if (command.equals("A001")) {
    digitalWrite(cols[0], HIGH); // Encender la columna 1
    digitalWrite(rows[0], HIGH); // Encender la fila 1
    delay(15000);
    digitalWrite(cols[0], LOW);
  } else if (command.equals("A000")) {
    digitalWrite(cols[0], LOW); // Apagar la columna 1
  }

  if (command.equals("A011")) {
    digitalWrite(cols[1], HIGH); // Encender el LED
  } else if (command.equals("A010")) {
    digitalWrite(rows[1], LOW); // Apagar el LED
  }

  if (command.equals("A021")) {
    digitalWrite(cols[2], HIGH); // Encender el LED
  } else if (command.equals("A020")) {
    digitalWrite(rows[2], LOW); // Apagar el LED
  }

   if (command.equals("A031")) {
    digitalWrite(cols[3], HIGH); // Encender el LED
  } else if (command.equals("A030")) {
    digitalWrite(rows[3], LOW); // Apagar el LED
  }
}



