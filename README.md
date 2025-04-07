# 💪🏼 Shakti Kavach - IoT-Powered Smart Wearable for Women’s Safety

> *“Empowering women with smart tech – blending safety, health, and AI-driven innovation.”*

---

## 📌 Project Overview

**Shakti Kavach** is an IoT-based smart wearable designed to enhance **women's safety** by providing real-time alerts, health tracking, and emergency defense mechanisms. The wearable acts as a **discreet yet powerful device**, offering protection, wellness monitoring, and intelligent alerting during distress situations.

Developed by **Team Circuit 25**, this project aims to create an impact in urban safety, especially for women, by blending technology, empathy, and innovation.

🔍 *For more information on the project, refer to the `submission_content` folder.*

---

## 🛠️ How to Run the Project

### 📦 Prerequisites

- Arduino IDE  
- ESP32 Board Package installed in Arduino  
- USB cable for microcontroller programming  
- Firebase account for real-time database  
- Android Studio / Expo Go for React Native app (optional)  
- Required libraries installed:
  - `Adafruit_GFX`
  - `Adafruit_SSD1306`
  - `WiFi.h`
  - `FirebaseESP32.h`
  - `Wire.h`
  - `Servo.h`
  - `MPU6050.h`

## 🛠️ How to Run the Project

### 📦 Prerequisites

- Arduino IDE  
- ESP32 Board Package installed in Arduino  
- USB cable for microcontroller programming  
- Required libraries installed:
  - `Adafruit_GFX`
  - `Adafruit_SSD1306`
  - `WiFi.h`
  - `FirebaseESP32.h`
  - `Wire.h`
  - `Servo.h`
  - `MPU6050.h`

- Node.js & npm  
- Next.js (for the web dashboard)

---

### 🚀 Setup Steps

1. **Hardware Setup**  
   - Connect all components (sensors, actuators) to the ESP32/Arduino according to the schematic.  
   - Load Arduino code from the `firmware/` directory using Arduino IDE.  
   - Select correct board and COM port, then upload the code.  
   - Monitor sensor outputs and alert triggers via the Serial Monitor.

2. **Next.js Web Dashboard Setup**  
   - Navigate to the `web_dashboard/` directory.  
   - Run `npm install` to install dependencies.  
   - Set up Firebase credentials in a `.env.local` file:  
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```
   - Run the dashboard with `npm run dev`  
   - The dashboard should now reflect real-time data from the device via Firebase.

---

## 🚀 Key Features

- 🛡️ **Safety First**  
  - Emergency Button  
  - Built-in Laser & Pepper Spray  
  - GPS-based alert to authorities & guardians  

- 💓 **All-in-One Health Tracker**  
  - Heart Rate, SpO2, Sleep, Stress & Menstrual Cycle  

- 📱 **Smart & Discreet**  
  - Compact wearable design  
  - Syncs seamlessly with mobile app  
  - Doesn’t require unlocking phone  

---

## 📐 Components Used

- ESP32 Microcontroller  
- ESP32-CAM  
- Arduino Uno  
- Pulse Sensor (GYMAX-30100)  
- Accelerometer & Gyroscope (MPU6050)  
- OLED Display  
- KY-038 Microphone  
- Active Buzzer  
- Servo Motor  
- Laser Module  
- Pepper Spray Mechanism  
- Jumper Wires, Resistors, LEDs  

---

## 📊 Future Enhancements

- 🤖 **AI-Powered Enhancements**  
  - Stress & emotion detection  
  - Health trend predictions  
  - Real-time AI feedback on user health  
  - Voice-command based alert cancellation  

- 🌐 **System Improvements**  
  - Better false alert detection  
  - Community alert networks  
  - Integration with police/NGO/government systems  
  - Further miniaturization and compact design  

---

## 👥 Team Circuit 25

- Kalash Bheda  
- Heet Bharadwa  
- Arnav Bhandari  
- Jason Dsouza  
- Param Shah  

---

## 🧠 Conclusion

> **Shakti Kavach** is more than a gadget — it's a step toward making the world safer for women.  
By combining real-time **safety features**, **health monitoring**, and **future-ready AI**, this project reflects our commitment to societal well-being through technological innovation.
