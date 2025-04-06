import smtplib
import random
import math
from geopy.distance import geodesic
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import folium
import webbrowser

# Police station dataset with emails
filtered_stations = [
    {"name": "Andheri Police Station", "latitude": 19.1204984, "longitude": 72.8480663, "email": "arnavbhandari1609@gmail.com"},
    {"name": "Bandra Police Station", "latitude": 19.0550, "longitude": 72.8400, "email": "jason.dsouza.here@gmail.com"},
    {"name": "Vile Parle Police Station", "latitude": 19.0965, "longitude": 72.8502, "email": "paramshahm@gmail.com"},
    {"name": "Sion Police Station", "latitude": 19.0420, "longitude": 72.8617, "email": "bharadwaheetmovusetp@gmail.com"},
    {"name": "Versova Police Station", "latitude": 19.1244929, "longitude": 72.8303846, "email": "kkalashbheda@gmail.com"}
]

# Generate random point within 10 km of Andheri
def generate_random_point_within_radius(lat, lon, radius_km):
    radius_deg = radius_km / 111
    angle = random.uniform(0, 2 * math.pi)
    distance = radius_deg * math.sqrt(random.uniform(0, 1))
    delta_lat = distance * math.cos(angle)
    delta_lon = distance * math.sin(angle) / math.cos(math.radians(lat))
    return lat + delta_lat, lon + delta_lon

# Generate emergency coordinate
center_lat, center_lon = 19.1197, 72.8468
emergency_lat, emergency_lon = generate_random_point_within_radius(center_lat, center_lon, 10)
emergency_coord = (emergency_lat, emergency_lon)

# Filter stations within 10km
stations_within_radius = []
for station in filtered_stations:
    dist = geodesic(emergency_coord, (station["latitude"], station["longitude"])).meters
    if dist <= 10000:
        station["distance"] = dist
        stations_within_radius.append(station)

stations_within_radius.sort(key=lambda s: s["distance"])
nearest_station = stations_within_radius[0] if stations_within_radius else None

# Google Maps link
google_maps_link = f"https://www.google.com/maps?q={emergency_lat},{emergency_lon}"

# Email sender credentials
sender_email = "bhandariarnav06@gmail.com"
sender_password = "yrnv akmp lhhf laoc"

# --- Send Email to Nearest Police Station ---
if nearest_station:
    receiver_email = nearest_station["email"]

    subject_police = "🚨 Emergency Alert: Nearest Police Station Needed"
    body_police = f"""
    An emergency has been reported!

    📍 Emergency Location:
    Latitude: {emergency_lat}
    Longitude: {emergency_lon}
    Google Maps: {google_maps_link}

    

    🧭 Distance: {round(nearest_station['distance'], 2)} meters
    Please respond immediately.
    """

    msg_police = MIMEMultipart()
    msg_police["From"] = sender_email
    msg_police["To"] = receiver_email
    msg_police["Subject"] = subject_police
    msg_police.attach(MIMEText(body_police, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg_police)
        print(f"📩 Police Email sent to {nearest_station['name']} ({receiver_email})")
    except Exception as e:
        print("❌ Failed to send police email:", e)
    finally:
        server.quit()

    # --- Send Email to a Guardian ---
    possible_guardians = [s["email"] for s in filtered_stations if s["email"] != receiver_email]
    guardian_email = random.choice(possible_guardians)

    subject_guardian = "📢 Alert: Your Contact May Be in Danger"
    body_guardian = f"""
    Dear Guardian,

    A possible emergency involving someone you care about has been detected near the following location:

    📍 Emergency Location:
    Latitude: {emergency_lat}
    Longitude: {emergency_lon}
    Google Maps: {google_maps_link}

    Authorities have already been notified. This message is for your awareness and support.

    - Emergency Alert System
    """

    msg_guardian = MIMEMultipart()
    msg_guardian["From"] = sender_email
    msg_guardian["To"] = guardian_email
    msg_guardian["Subject"] = subject_guardian
    msg_guardian.attach(MIMEText(body_guardian, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg_guardian)
        print(f"👨‍👩‍👧‍👦 Guardian Email sent to {guardian_email}")
    except Exception as e:
        print("❌ Failed to send guardian email:", e)
    finally:
        server.quit()
else:
    print("❌ No nearby police stations found.")

# Create map
m = folium.Map(location=[emergency_lat, emergency_lon], zoom_start=13)
folium.Marker([emergency_lat, emergency_lon], popup="Emergency", icon=folium.Icon(color="red")).add_to(m)

for station in stations_within_radius:
    folium.Marker(
        [station["latitude"], station["longitude"]],
        popup=f"{station['name']} ({round(station['distance'], 2)}m)",
        icon=folium.Icon(color="blue" if station != nearest_station else "green")
    ).add_to(m)

if nearest_station:
    folium.PolyLine(
        [emergency_coord, (nearest_station["latitude"], nearest_station["longitude"])],
        color="green", tooltip="Path to Nearest Station"
    ).add_to(m)

map_path = "emergency_map.html"
m.save(map_path)
webbrowser.open(map_path)
