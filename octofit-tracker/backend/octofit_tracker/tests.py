from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse


class APIRootTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_root(self):
        resp = self.client.get(reverse('api_root'))
        self.assertEqual(resp.status_code, 200)
        # Expect keys for main resources
        for key in ('profiles', 'teams', 'activities', 'workouts', 'leaderboard'):
            self.assertIn(key, resp.data)
