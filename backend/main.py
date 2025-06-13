from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, crud
from firebase_config import send_push_notification
from fastapi import HTTPException
from firebase_admin import _messaging_utils  # Add this import


import uuid
import requests

from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    # You can add more allowed origins here
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests only from these origins
    allow_credentials=True,
    allow_methods=["*"],    # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],    # Allows all headers
)

FCM_SERVER_KEY = "BO0sB5bwjmuj8Rpl4TROoOyPTEFPNqKHu_F9_4VVyWmDFAQIBdqzkIIaFAwGxbpsdzQs7cZuQdPFBMnXJoQYQYo"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register_token/", tags=["Send-Notification"])
def register_token(payload: schemas.FCMTokenCreate, db: Session = Depends(get_db)):
    token_entry = db.query(models.FCMToken).filter_by(uuid=payload.uuid).first()
    if token_entry:
        token_entry.token = payload.token
    else:
        token_entry = models.FCMToken(**payload.dict())
        db.add(token_entry)
    db.commit()
    return {"message": "Token registered"}



@app.get("/notifications/{user_id}", response_model=list[schemas.NotificationOut],tags=["Send-Notification"])
def read_notifications(user_id: str, db: Session = Depends(get_db)):
    return crud.get_notifications(db, user_id)

# @app.post("/notifications/send", response_model=schemas.NotificationOut)
# def send_notification(notif: schemas.NotificationCreate, db: Session = Depends(get_db)):
#     token = notif.fcm_token or crud.get_fcm_token_by_user_id(db, notif.user_id)
#     if token:
#         send_push_notification(token, notif.title, notif.message)
#     return crud.create_notification(db, notif)

@app.post("/notifications/send", response_model=schemas.NotificationOut, tags=["Send-Notification"])
def send_notification(notif: schemas.NotificationCreate, db: Session = Depends(get_db)):
    token = getattr(notif, "fcm_token", None) or crud.get_fcm_token_by_user_id(db, notif.user_id)
    if not token:
        raise HTTPException(status_code=404, detail="FCM token not found for user")
    try:
        send_push_notification(token, notif.title, notif.message)
    except _messaging_utils.UnregisteredError:
        # Remove the invalid token from DB
        crud.delete_fcm_token(db, token)
        raise HTTPException(status_code=400, detail="FCM token is unregistered or invalid")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return crud.create_notification(db, notif)

@app.patch("/notifications/mark_viewed/{notif_id}", tags=["Send-Notification"])
def mark_viewed(notif_id: str, db: Session = Depends(get_db)):
    return crud.mark_as_viewed(db, notif_id)

@app.delete("/notifications/{notif_id}", tags=["Send-Notification"])
def delete_notification(notif_id: str, db: Session = Depends(get_db)):
    return crud.delete_notification(db, notif_id)

@app.delete("/fcm_token/{token}", tags=["Send-Notification"])
def delete_fcm_token_endpoint(token: str, db: Session = Depends(get_db)):
    crud.delete_fcm_token(db, token)
    return {"message": "FCM token deleted"}