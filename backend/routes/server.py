from fastapi import APIRouter, HTTPException
from ..models.server_stats import ServerStats
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/server/stats", response_model=ServerStats)
async def get_server_stats():
    """Get current server statistics"""
    try:
        # Try to get from database first
        stats = await db.server_stats.find_one()
        
        if not stats:
            # Create default stats if none exist
            default_stats = ServerStats()
            await db.server_stats.insert_one(default_stats.dict())
            return default_stats
            
        return ServerStats(**stats)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/server/stats")
async def update_server_stats(stats: ServerStats):
    """Update server statistics (admin only - for demo)"""
    try:
        stats.lastUpdated = datetime.utcnow()
        await db.server_stats.replace_one(
            {"id": stats.id}, 
            stats.dict(),
            upsert=True
        )
        return {"success": True, "message": "Estatísticas atualizadas"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))