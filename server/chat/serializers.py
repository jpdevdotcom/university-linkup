# chat/serializers.py
from rest_framework import serializers
from .models import Nickname

class NicknameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nickname
        fields = ['id', 'nickname', 'created_at']
