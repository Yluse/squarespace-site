from pydantic import BaseModel, Field
from datetime import datetime
import uuid
import requests

class ServerStats(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    onlinePlayers: int = 0
    maxPlayers: int = 10
    serverVersion: str = "1.21.101.1"
    serverIp: str = "plus-02.bedhosting.com.br"
    serverPort: int = 10354
    host_provider_url: str = "https://app.bedhosting.com.br/server/7a76c24d"
    serverStatus: str = "offline"  # "online" ou "offline"
    lastUpdated: datetime = Field(default_factory=datetime.utcnow)

    @classmethod
    def fetch_from_hosting(cls):
        """
        Busca os dados reais do servidor na Best Hosting.
        """
        url = "https://app.bedhosting.com.br/server/7a76c24d"
        try:
            resp = requests.get(url)
            resp.raise_for_status()
            data = resp.json()
            # Ajuste os campos conforme o JSON retornado pela Best Hosting
            # Exemplo de campos esperados:
            # {
            #   "players": {"online": 5, "max": 100},
            #   "version": "1.21.101.1",
            #   "ip": "plus-02.bedhosting.com.br",
            #   "port": 10354,
            #   "status": "online"
            # }
            return cls(
                onlinePlayers = data.get("players", {}).get("online", 0),
                maxPlayers = data.get("players", {}).get("max", 10),
                serverVersion = data.get("version", "1.21.101.1"),
                serverIp = data.get("ip", "plus-02.bedhosting.com.br"),
                serverPort = int(data.get("port", 10354)),
                host_provider_url = url,
                serverStatus = data.get("status", "offline"),
                lastUpdated = datetime.utcnow()
            )
        except Exception as e:
            print(f"Erro ao buscar dados do servidor: {e}")
            return cls(serverStatus="offline")

    def update_from_hosting(self):
        """
        Atualiza os dados deste objeto com os dados reais do servidor.
        """
        updated = self.fetch_from_hosting()
        self.onlinePlayers = updated.onlinePlayers
        self.maxPlayers = updated.maxPlayers
        self.serverVersion = updated.serverVersion
        self.serverIp = updated.serverIp
        self.serverPort = updated.serverPort
        self.lastUpdated = updated.lastUpdated
        self.host_provider_url = updated.host_provider_url
        self.serverStatus = updated.serverStatus

# Exemplo de uso:
# stats = ServerStats.fetch_from_hosting()
# stats.update_from_hosting()