# Placeholder for Django Channels consumers
# Replace this with your own WebSocket consumer implementation.

from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({
            "system": "⚠️ Stub consumer: Implement real chat backend here."
        }))

    async def receive(self, text_data):
        # Just echoes the received message
        data = json.loads(text_data)
        await self.send(text_data=json.dumps({
            "message": data.get("message", ""),
            "sender": "other"
        }))

    async def disconnect(self, close_code):
        pass
