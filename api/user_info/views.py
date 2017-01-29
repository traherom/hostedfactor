from django.shortcuts import render
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import User
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

import datetime
from . import models

class Authenticate(APIView):
    """
    Attempt to authenticate a user and return a token for them
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        """
        Attempt to log user in

        Data should be in the form:
        {"user":"traherom", "credentials":"aoeu"}
        """
        try:
            user_info = models.UserLoginInfo.objects.get(user__username=request.data['user'])
        except KeyError:
            return Response({
                    'message': '"user" not supplied'
                },
                status=status.HTTP_400_BAD_REQUEST)

        try:
            creds = request.data['credentials']
        except KeyError:
            return Response({
                    'message': '"credentials" not supplied'
                },
                status=status.HTTP_400_BAD_REQUEST)

        # Rate limit login attempts
        if user_info.failed_login_count >= settings.MAX_FAILED_LOGINS:
            delta = datetime.timedelta(seconds=settings.FAILED_LOGIN_BACKOFF_SECONDS)
            retry_allowed_after = user_info.last_login_attempt + delta
            if timezone.now() < retry_allowed_after:
                return Response({
                        'message': 'You have failed too many login attempts and are temporarily locked out',
                    },
                    status=status.HTTP_429_TOO_MANY_REQUESTS)

        # TODO Check credentials

        # Reset failed login attempt and tell them about any failures
        failed_count = user_info.failed_login_count
        user_info.failed_login_count = 0
        user_info.save()

        return Response({
            'user': user_info.user.username,
            'token': 'aoeu',
            'failed_count': failed_count,
            'last_login_attempt': user_info.last_login_attempt,
        })


class Register(APIView):
    """
    Register a new user

    Expects:
        - Username
        - Credentials (encrypted password)
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        try:
            username = request.data['user']
        except KeyError:
            return Response({
                    'message': '"user" not supplied'
                },
                status=status.HTTP_400_BAD_REQUEST)

        try:
            creds = request.data['credentials']
        except KeyError:
            return Response({
                    'message': '"credentials" not supplied'
                },
                status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            user = User.objects.create_user(username, '{}@hostedfactor.io'.format(username), creds)
            user_info = models.UserLoginInfo.objects.create(
                user=user,
                credentials=creds,
            )

            return Response({
                'user': user_info.user.username,
                'token': 'aoeu',
                'failed_count': user_info.failed_login_count,
                'last_login_attempt': user_info.last_login_attempt,
            })
