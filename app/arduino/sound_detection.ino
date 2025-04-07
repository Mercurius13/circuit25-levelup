const int micPin = A0;  // HW-484 analog output connected to A0
int threshold = 350;

void setup() {
  Serial.begin(115200);  // Fast serial communication
  Serial.println("=== Microphone Sound Monitor ===");
  Serial.println("Threshold set to: 500");
  Serial.println("--------------------------------");
}

void loop() {
  int soundLevel = analogRead(micPin);  // Read sound level

  Serial.print("Sound Level: ");
  Serial.print(soundLevel);

  if (soundLevel > threshold) {
    Serial.println("  🚨 Alert! Loud sound detected!");
  } else {
    Serial.println();
  }

  delay(500);  // Small delay for stable reading
}