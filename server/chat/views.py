# chat/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Nickname
from .serializers import NicknameSerializer

class NicknameRegisterView(APIView):
    def post(self, request):
        nickname = request.data.get("nickname", "").strip()
        if not nickname:
            return Response({"error": "Nickname is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if Nickname.objects.filter(nickname=nickname).exists():
            return Response({"error": "Nickname already exists"}, status=status.HTTP_400_BAD_REQUEST)

        new_nick = Nickname.objects.create(nickname=nickname)
        serializer = NicknameSerializer(new_nick)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
