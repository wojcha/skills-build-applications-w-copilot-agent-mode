from django.contrib import admin
from .models import Profile, Team, Activity, Workout, LeaderboardEntry


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'display_name')


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    filter_horizontal = ('members',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity_type', 'duration_minutes', 'timestamp')
    list_filter = ('activity_type',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'date', 'duration_minutes')


@admin.register(LeaderboardEntry)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('user', 'score', 'rank', 'updated_at')
