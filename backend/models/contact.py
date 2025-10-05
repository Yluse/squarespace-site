from pydantic import BaseModel, Field
from datetime import datetime
import uuid

class ContactCreate(BaseModel):
    name: str
    email: str
    message: str

class Contact(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    submitted_at: datetime = Field(default_factory=datetime.utcnow)