from sqlalchemy.orm import Session
from models import Notification, FCMToken
from schemas import NotificationCreate, FCMTokenCreate

def create_notification(db: Session, notif: NotificationCreate):
    db_notif = Notification(
        user_id=notif.user_id,
        title=notif.title,
        message=notif.message,
        type=notif.type,
        viewed=False  # or notif.viewed if provided
    )
    db.add(db_notif)
    db.commit()
    db.refresh(db_notif)
    return db_notif

def get_notifications(db: Session, user_id: str):
    return db.query(Notification).filter_by(user_id=user_id).order_by(Notification.timestamp.desc()).all()

def mark_as_viewed(db: Session, notif_id: str):
    notif = db.query(Notification).filter_by(id=notif_id).first()
    if notif:
        notif.viewed = True
        db.commit()
        db.refresh(notif)
    return notif

def delete_notification(db: Session, notif_id: str):
    notif = db.query(Notification).filter_by(id=notif_id).first()
    if notif:
        db.delete(notif)
        db.commit()
    return notif

def register_fcm_token(db: Session, token_data: FCMTokenCreate):
    existing = db.query(FCMToken).filter_by(uuid=token_data.uuid).first()
    if existing:
        existing.token = token_data.token
    else:
        new_token = FCMToken(**token_data.dict())
        db.add(new_token)
    db.commit()

def get_fcm_token_by_user_id(db: Session, user_id: str):
    token_record = db.query(FCMToken).filter_by(user_id=user_id).first()
    return token_record.token if token_record else None

def delete_fcm_token(db: Session, token: str):
    token_entry = db.query(FCMToken).filter_by(token=token).first()
    if token_entry:
        db.delete(token_entry)
        db.commit()