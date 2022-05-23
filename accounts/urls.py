from django.urls import path, re_path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as know_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', know_views.LogoutView.as_view(), name='knox_logout'),
    re_path(r'^api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]
