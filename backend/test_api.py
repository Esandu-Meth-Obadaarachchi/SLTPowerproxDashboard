import requests

BASE_URL = "http://localhost:8000"

# Register token
response = requests.post(f"{BASE_URL}/register_token/", json={
    "uuid": "testuser1",
    "token": "fake_fcm_token_xyz"
})
print("Register token:", response.json())

# Send notification
response = requests.post(f"{BASE_URL}/notifications/send", json={
    "user_id": "testuser1",
    "title": "Test Notification",
    "message": "This is a test message",
    "type": "info"
})
print("Send notification:", response.json())

# Get notifications
response = requests.get(f"{BASE_URL}/notifications/testuser1")
print("Get notifications:", response.json())