from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class ItemCreate(BaseModel):
    name: str
    description: str
    price: float
    type: str  # weapon, armor, pet

class Item(ItemCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    fictional: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PurchaseAttempt(BaseModel):
    item_id: str
    player_name: Optional[str] = None
    email: Optional[str] = None