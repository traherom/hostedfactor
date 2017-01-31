from django.db import models
from django.conf import settings

class UserLoginInfo(models.Model):
    """
    Extra info needed for a user to use the API

    To work with the API, the user will be sending us an already-encrypted password.
    Internally we store that encrypted again.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='login_info',
        null=False,
        )

    # Rate limiting
    last_login_attempt = models.DateTimeField(auto_now_add=True, editable=True)
    failed_login_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return str(self.user)

