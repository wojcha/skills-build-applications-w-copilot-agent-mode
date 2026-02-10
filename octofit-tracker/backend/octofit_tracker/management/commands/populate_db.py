from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Workout, LeaderboardEntry, Profile

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Workout.objects.all().delete()
        Profile.objects.all().delete()

        # Create users (super heroes)
        ironman = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', first_name='Tony', last_name='Stark')
        captainamerica = User.objects.create_user(username='captainamerica', email='cap@marvel.com', password='password', first_name='Steve', last_name='Rogers')
        batman = User.objects.create_user(username='batman', email='batman@dc.com', password='password', first_name='Bruce', last_name='Wayne')
        wonderwoman = User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='password', first_name='Diana', last_name='Prince')

        # Create profiles for users
        Profile.objects.create(user=ironman, display_name='Iron Man')
        Profile.objects.create(user=captainamerica, display_name='Captain America')
        Profile.objects.create(user=batman, display_name='Batman')
        Profile.objects.create(user=wonderwoman, display_name='Wonder Woman')

        # Create teams (must be saved before adding members to many-to-many)
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Add members to teams
        marvel.members.add(ironman, captainamerica)
        dc.members.add(batman, wonderwoman)

        # Create activities
        Activity.objects.create(user=ironman, activity_type='Running', duration_minutes=30, calories=300, team=marvel)
        Activity.objects.create(user=captainamerica, activity_type='Cycling', duration_minutes=45, calories=400, team=marvel)
        Activity.objects.create(user=batman, activity_type='Swimming', duration_minutes=25, calories=350, team=dc)
        Activity.objects.create(user=wonderwoman, activity_type='Yoga', duration_minutes=60, calories=200, team=dc)

        # Create leaderboard entries
        LeaderboardEntry.objects.create(user=ironman, score=300, rank=1)
        LeaderboardEntry.objects.create(user=captainamerica, score=400, rank=2)
        LeaderboardEntry.objects.create(user=batman, score=350, rank=3)
        LeaderboardEntry.objects.create(user=wonderwoman, score=200, rank=4)

        # Create workouts
        from datetime import date
        Workout.objects.create(user=ironman, name='Super Strength', exercises=['Bench Press', 'Deadlift', 'Squats'], date=date.today(), duration_minutes=60)
        Workout.objects.create(user=captainamerica, name='Agility Training', exercises=['Burpees', 'Ladder Drills', 'Box Jumps'], date=date.today(), duration_minutes=45)
        Workout.objects.create(user=batman, name='Endurance Run', exercises=['5K Run', 'Sprint Intervals'], date=date.today(), duration_minutes=30)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
