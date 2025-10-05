from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from ..models.item import Item, PurchaseAttempt
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/items", response_model=List[Item])
async def get_items():
    """Get all fictional items for sale"""
    try:
        items = await db.items.find().to_list(1000)
        return [Item(**item) for item in items]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/items/{item_id}/purchase")
async def purchase_item(item_id: str, purchase_data: PurchaseAttempt):
    """Attempt to purchase an item (always fails - fictional items)"""
    try:
        # Check if item exists
        item = await db.items.find_one({"id": item_id})
        if not item:
            raise HTTPException(status_code=404, detail="Item não encontrado")
        
        # Log the purchase attempt
        purchase_log = {
            "item_id": item_id,
            "item_name": item["name"],
            "player_name": purchase_data.player_name,
            "email": purchase_data.email,
            "attempted_at": datetime.utcnow(),
            "status": "rejected_fictional"
        }
        
        await db.purchase_attempts.insert_one(purchase_log)
        
        # Always reject - fictional items
        return {
            "success": False,
            "message": "⚠️ Este é um item fictício para demonstração. Não é possível realizar compras reais neste protótipo.",
            "item": Item(**item)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))