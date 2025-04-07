#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#include <U8x8lib.h>

#define REPORTING_PERIOD_MS 500

PulseOximeter pox;
uint32_t tsLastReport = 0;

U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8;

void onBeatDetected() {
  Serial.println("* Beat detected");
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  u8x8.begin();
  u8x8.setFont(u8x8_font_8x13_1x2_f);
  u8x8.drawString(0, 0, "Initializing...");

  if (!pox.begin()) {
    Serial.println("❌ MAX30100 init failed.");
    u8x8.clear();
    u8x8.drawString(0, 2, "Sensor Failed!");
    while (1);
  }

  pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
  pox.setOnBeatDetectedCallback(onBeatDetected);

  Serial.println("✅ MAX30100 ready");
  u8x8.clearDisplay();
  u8x8.drawString(0, 0, "Waiting...");
}

void loop() {
  pox.update();

  if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
    float hr = pox.getHeartRate();
    float spo2 = pox.getSpO2();

    Serial.println("--------");
    Serial.print("Raw HR: ");
    Serial.println(hr);
    Serial.print("Raw SpO2: ");
    Serial.println(spo2);

    bool validHR = hr > 40 && hr < 200;
    bool validSpO2 = spo2 > 85 && spo2 <= 100;

    u8x8.clearDisplay();

    if (validHR && validSpO2) {
      u8x8.setCursor(0, 0);
      u8x8.print("HR: ");
      u8x8.print((int)hr);
      u8x8.print(" bpm");

      u8x8.setCursor(0, 2);
      u8x8.print("SpO2: ");
      u8x8.print((int)spo2);
      u8x8.print(" %");
    } else {
      u8x8.setCursor(0, 1);
      u8x8.print("❌ Net Issue");
    }

    tsLastReport = millis();
  }
}
