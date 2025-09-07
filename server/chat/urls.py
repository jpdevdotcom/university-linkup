# chat/urls.py
from django.urls import path
from .views import NicknameRegisterView

urlpatterns = [
    path('register-nickname/', NicknameRegisterView.as_view(), name='register-nickname'),
]
