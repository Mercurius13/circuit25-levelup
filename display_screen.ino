#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#include <U8g2lib.h>

#define REPORTING_PERIOD_MS 500  // faster updates

PulseOximeter pox;
uint32_t tsLastReport = 0;

// OLED Setup (using I2C)
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, /* reset=*/ U8X8_PIN_NONE);

// Callback for heartbeat detection (optional)
void onBeatDetected() {
  Serial.println("* Beat detected");
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  // Initialize OLED
  u8g2.begin();

  // Initialize MAX30100
  if (!pox.begin()) {
    Serial.println("❌ MAX30100 init failed. Check wiring.");
    while (1);
  }
  Serial.println("✅ MAX30100 ready");

  pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
  pox.setOnBeatDetectedCallback(onBeatDetected);
}

void loop() {
  pox.update();

  if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
    float hr = pox.getHeartRate();
    float spo2 = pox.getSpO2();

    u8g2.clearBuffer();

    // Heart Icon
    u8g2.setFont(u8g2_font_open_iconic_embedded_1x_t);
    u8g2.drawGlyph(10, 20, 0x0048);

    // Heart Rate
    u8g2.setFont(u8g2_font_ncenB14_tr);
    u8g2.setCursor(30, 20);
    u8g2.print("HR: ");
    if (hr > 30 && hr < 220)
      u8g2.print((int)hr);
    else
      u8g2.print("--");

    // SpO2
    u8g2.setCursor(10, 50);
    u8g2.print("SpO2: ");
    if (spo2 > 50 && spo2 <= 100)
      u8g2.print((int)spo2);
    else
      u8g2.print("--");
    u8g2.print(" %");

    u8g2.sendBuffer();
    tsLastReport = millis();
  }
}