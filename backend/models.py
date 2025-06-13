from sqlalchemy import Column, String, DateTime, Text, Boolean
from database import Base
from datetime import datetime
from sqlalchemy.sql import func
import uuid


# class Fault(Base):
#     __tablename__ = "faults"
#     fault_id = Column(String(255), primary_key=True, index=True)
#     uuid = Column(String(255))
#     region = Column(String(255))
#     building = Column(String(255))
#     floor = Column(String(255))
#     room = Column(String(255))
#     asset_type = Column(String(255))
#     model = Column(String(255))
#     brand = Column(String(255))
#     fault_type = Column(String(255))
#     fault_detail = Column(String(255))
#     priority = Column(String(255))
#     fault_description = Column(Text)
#     fault_occurred_date = Column(String(255))
#     updated_by = Column(String(255))
#     contact_number = Column(String(255))
#     details_verified = Column(String(255))

class FCMToken(Base):
    __tablename__ = "fcm_tokens"
    uuid = Column(String(255), primary_key=True)
    token = Column(String(255))

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), index=True)
    title = Column(String(255))
    message = Column(Text)
    type = Column(String(50))
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    viewed = Column(Boolean, default=False)
