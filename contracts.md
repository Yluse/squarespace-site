# Contracts - Squarespace The Last Website

## Frontend-Backend Integration Protocol

### Mock Data Currently Used
Located in `/frontend/src/data/mock.js`:
- `mockItems`: Array of fictional Minecraft items (3 items with id, name, description, price, type, fictional fields)
- `mockServerStats`: Server statistics (onlinePlayers, maxPlayers, serverVersion, serverIp)

### API Endpoints to Implement

#### 1. Items API
```
GET /api/items
- Returns: List of all fictional items for sale
- Response: Array of item objects

POST /api/items/:id/purchase
- Body: { item_id, player_name?, email? }
- Returns: { success: false, message: "Item fictício - compra não permitida", item: {...} }
```

#### 2. Server Stats API
```
GET /api/server/stats  
- Returns: Server statistics (players online, version, ip, etc)
- Response: { onlinePlayers, maxPlayers, serverVersion, serverIp }
```

#### 3. Contact API
```
POST /api/contact
- Body: { name, email, message }
- Returns: { success, message }
- Action: Log contact attempt (no real sending)
```

### Data Models

#### Item Model
```javascript
{
  id: String,
  name: String,
  description: String, 
  price: Number,
  type: String (weapon/armor/pet),
  fictional: Boolean (always true),
  created_at: Date,
  updated_at: Date
}
```

#### ServerStats Model
```javascript
{
  id: String,
  onlinePlayers: Number,
  maxPlayers: Number,
  serverVersion: String,
  serverIp: String,
  lastUpdated: Date
}
```

#### Contact Model
```javascript
{
  id: String,
  name: String,
  email: String,
  message: String,
  submitted_at: Date
}
```

### Frontend Integration Points

1. **Remove mock imports**: Delete `import { mockItems } from '../data/mock'` from Home.jsx
2. **Add API calls**: 
   - `fetchItems()` in Home.jsx useEffect
   - `fetchServerStats()` for footer data
   - `handleAddToCart()` should call POST /api/items/:id/purchase
3. **Error handling**: Add loading states and error messages
4. **Toast notifications**: Use sonner for purchase attempt notifications

### Backend Implementation Strategy

1. **Create MongoDB collections**: items, server_stats, contacts
2. **Seed initial data**: Insert the 3 mock items into database
3. **API Routes**: Implement all endpoints with proper error handling
4. **Fictional item protection**: Always return "fictional item" message for purchases
5. **CORS**: Already configured for frontend communication

### Testing Requirements

1. **GET /api/items** - Should return 3 fictional items
2. **POST /api/items/:id/purchase** - Should always reject with fictional message  
3. **GET /api/server/stats** - Should return current server info
4. **POST /api/contact** - Should store contact and return success
5. **Frontend integration** - Remove mocks, add API calls, test UI flows

### Key Notes

- All items are fictional - purchases should never succeed
- Server stats can be static/mocked data
- Contact form should work but not send real emails
- Maintain winninkit design system throughout
- Discord link: https://discord.gg/eM6WnEVs (hardcoded, no backend needed)