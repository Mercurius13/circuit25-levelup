from flask import Flask, jsonify
import serial
import threading
import time

app = Flask(__name__)

# Global variables to store latest HR and SPO2
latest_hr = None
latest_spo2 = None

def read_serial():
    global latest_hr, latest_spo2
    ser = serial.Serial('COM9', 115200, timeout=1)
    time.sleep(2)  # Wait for serial to stabilize
    while True:
        try:
            line = ser.readline().decode('utf-8').strip()
            if "HR:" in line and "SPO2:" in line:
                parts = line.split(',')
                latest_hr = float(parts[0].split(':')[1])
                latest_spo2 = float(parts[1].split(':')[1])
                print(f"[Serial] HR: {latest_hr} SPO2: {latest_spo2}")
        except Exception as e:
            print(f"[Serial Error] {e}")

# Start serial reading in background
threading.Thread(target=read_serial, daemon=True).start()

@app.route('/api/heartrate', methods=['GET', 'POST'])
def get_heart_rate():
    if latest_hr is not None and latest_spo2 is not None:
        return jsonify({'heart_rate': latest_hr, 'spo2': latest_spo2})
    else:
        return jsonify({'heart_rate': None, 'spo2': None})

if __name__ == '__main__':
    app.run(debug=True)
