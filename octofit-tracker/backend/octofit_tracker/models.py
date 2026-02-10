from django.db import models
from django.conf import settings


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    display_name = models.CharField(max_length=150, blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.display_name or str(self.user)


class Team(models.Model):
    name = models.CharField(max_length=150)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='teams', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Activity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='activities')
    team = models.ForeignKey(Team, null=True, blank=True, on_delete=models.SET_NULL, related_name='activities')
    activity_type = models.CharField(max_length=100)
    duration_minutes = models.PositiveIntegerField(default=0)
    calories = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.activity_type} ({self.duration_minutes}m)"


class Workout(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='workouts')
    name = models.CharField(max_length=200)
    exercises = models.JSONField(default=list, blank=True)
    date = models.DateField()
    duration_minutes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.user})"


class LeaderboardEntry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='leaderboard_entries')
    score = models.IntegerField(default=0)
    rank = models.PositiveIntegerField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-score', 'updated_at']

    def __str__(self):
        return f"{self.user} - {self.score}"
