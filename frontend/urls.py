from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('offers', views.index),
    path('help', views.index),
    path('login', views.index),
    path('forgot', views.index),
    path('register', views.index),
    path('help/legal', views.index),
]
