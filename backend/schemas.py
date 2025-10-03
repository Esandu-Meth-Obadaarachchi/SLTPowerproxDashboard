from pydantic import BaseModel
from datetime import datetime
from typing import Optional



# class FaultCreate(BaseModel):
#     uuid: str
#     region: str
#     building: str
#     floor: str
#     room: str
#     asset_type: str
#     model: str
#     brand: str
#     fault_type: str
#     fault_detail: str
#     fault_id: str
#     priority: str
#     fault_description: str
#     fault_occurred_date: str
#     updated_by: str
#     contact_number: str
#     details_verified: str

class NotificationBase(BaseModel):
    user_id: str
    title: str
    message: str
    type: str

class NotificationCreate(NotificationBase):
    fcm_token: Optional[str] = None

class NotificationOut(NotificationBase):
    id: str
    timestamp: datetime
    viewed: bool

    class Config:
        from_attributes  = True

class FCMTokenCreate(BaseModel):
    uuid: str
    token: str



