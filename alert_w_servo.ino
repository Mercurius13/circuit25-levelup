#include <ESP32Servo.h>

// GPIO pin definitions for ESP32
#define BUTTON_PIN 2    // Push button
#define LED_PIN 18       // LED
#define BUZZER_PIN 21   // Buzzer
#define SERVO_PIN 4    // Servo motor

// State variables
bool systemActive = false;
bool lastButtonState = HIGH;

Servo myServo;  // ESP32Servo object

void setup() {
  Serial.begin(115200);

  pinMode(BUTTON_PIN, INPUT_PULLUP); // Active LOW
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  // Attach servo to pin and set pulse range for standard servo
  myServo.setPeriodHertz(50); // 50 Hz PWM
  myServo.attach(SERVO_PIN, 500, 2400); // pulse width range in microseconds
  myServo.write(0); // Start at 0 degrees
}

void loop() {
  bool buttonState = digitalRead(BUTTON_PIN);

  if (buttonState == LOW && lastButtonState == HIGH) {
    delay(100);  // Debounce delay
    systemActive = !systemActive;

    if (systemActive) {
      Serial.println("System ON");
      digitalWrite(LED_PIN, HIGH);
      digitalWrite(BUZZER_PIN, HIGH);
      myServo.write(90);  // Move servo to 90 degrees
    } else {
      Serial.println("System OFF");
      digitalWrite(LED_PIN, LOW);
      digitalWrite(BUZZER_PIN, LOW);
      myServo.write(0);   // Move servo back to 0 degrees
    }
  }

  lastButtonState = buttonState;
}
