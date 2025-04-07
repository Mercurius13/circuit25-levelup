#include <Wire.h>
#include <MPU6050.h>

MPU6050 mpu(0x68); // Explicitly setting I2C address

// Step Count Variables
int stepCount = 0;
bool stepDetected = false;
unsigned long lastStepTime = 0;
float previousZ = 0;
float filteredZ = 0;

// Fall Detection Variables
bool monitoringFall = false;
unsigned long fallStartTime = 0;

// Loop Timer
unsigned long previousMillis = 0;
const unsigned long loopInterval = 20; // 50 Hz

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22); // SDA, SCL for ESP32

  delay(1000);
  mpu.initialize();

  if (mpu.testConnection()) {
    Serial.println("✅ MPU6050 Connected");
  } else {
    Serial.println("❌ MPU6050 Connection Failed");
    while (1);
  }
}

void loop() {
  unsigned long currentMillis = millis();

  // Run logic at 50Hz
  if (currentMillis - previousMillis >= loopInterval) {
    previousMillis = currentMillis;

    int16_t ax, ay, az;
    mpu.getAcceleration(&ax, &ay, &az);

    float ax_g = ax / 16384.0;
    float ay_g = ay / 16384.0;
    float az_g = az / 16384.0;

    float totalAcc = sqrt(ax_g * ax_g + ay_g * ay_g + az_g * az_g);  // G-Force magnitude

    // === FALL DETECTION ===
    if (!monitoringFall && (totalAcc < 0.7 || totalAcc > 2.8)) {
      monitoringFall = true;
      fallStartTime = currentMillis;
    }

    if (monitoringFall && (currentMillis - fallStartTime > 800)) {
      mpu.getAcceleration(&ax, &ay, &az); // recheck
      ax_g = ax / 16384.0;
      ay_g = ay / 16384.0;
      az_g = az / 16384.0;
      totalAcc = sqrt(ax_g * ax_g + ay_g * ay_g + az_g * az_g);

      if (totalAcc < 0.7 || totalAcc > 2.8) {
        Serial.println("⚠️ FALL DETECTED!");
      }
      monitoringFall = false;
    }

    // === STEP COUNTING ===
    float currentZ = az_g;
    filteredZ = 0.85 * filteredZ + 0.15 * (currentZ - previousZ);
    previousZ = currentZ;

    if (!stepDetected && filteredZ > 0.18) {
      if (currentMillis - lastStepTime > 250) {
        stepCount++;
        Serial.print("👣 Step Count: ");
        Serial.println(stepCount);
        lastStepTime = currentMillis;
        stepDetected = true;
      }
    }

    if (stepDetected && filteredZ < 0.06) {
      stepDetected = false;
    }
  }
}