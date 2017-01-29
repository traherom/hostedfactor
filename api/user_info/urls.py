from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^authenticate/', views.Authenticate.as_view(), name='api-auth'),
    url(r'^register/', views.Register.as_view(), name='api-register'),
]
