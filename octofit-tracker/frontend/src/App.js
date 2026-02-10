import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              <img src="/logo.png" alt="OctoFit Logo" />
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">Welcome to OctoFit Tracker</h1>
          <p className="lead text-muted">
            Your comprehensive fitness tracking application. Track activities, compete on leaderboards, manage teams, and achieve your fitness goals.
          </p>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="feature-icon bg-primary bg-opacity-10 rounded-3 mb-3 mx-auto" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span className="text-primary" style={{fontSize: '24px'}}>📊</span>
                </div>
                <h5 className="card-title fw-bold">Activities</h5>
                <p className="card-text text-muted">Track your fitness activities and monitor your progress over time.</p>
                <Link to="/activities" className="btn btn-outline-primary btn-sm">View Activities</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="feature-icon bg-success bg-opacity-10 rounded-3 mb-3 mx-auto" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span className="text-success" style={{fontSize: '24px'}}>🏆</span>
                </div>
                <h5 className="card-title fw-bold">Leaderboard</h5>
                <p className="card-text text-muted">Compete with friends and see rankings of top performers.</p>
                <Link to="/leaderboard" className="btn btn-outline-success btn-sm">View Leaderboard</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="feature-icon bg-info bg-opacity-10 rounded-3 mb-3 mx-auto" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span className="text-info" style={{fontSize: '24px'}}>👥</span>
                </div>
                <h5 className="card-title fw-bold">Teams</h5>
                <p className="card-text text-muted">Create and manage fitness teams to collaborate with others.</p>
                <Link to="/teams" className="btn btn-outline-info btn-sm">View Teams</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="feature-icon bg-warning bg-opacity-10 rounded-3 mb-3 mx-auto" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span className="text-warning" style={{fontSize: '24px'}}>👤</span>
                </div>
                <h5 className="card-title fw-bold">Users</h5>
                <p className="card-text text-muted">View and manage user profiles and account settings.</p>
                <Link to="/users" className="btn btn-outline-warning btn-sm">View Users</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="feature-icon bg-danger bg-opacity-10 rounded-3 mb-3 mx-auto" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span className="text-danger" style={{fontSize: '24px'}}>💪</span>
                </div>
                <h5 className="card-title fw-bold">Workouts</h5>
                <p className="card-text text-muted">Access personalized workout suggestions and training plans.</p>
                <Link to="/workouts" className="btn btn-outline-danger btn-sm">View Workouts</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow-sm bg-light">
              <div className="card-body py-4">
                <h5 className="card-title fw-bold mb-3">Getting Started</h5>
                <p className="card-text mb-2">1. <strong>Track Your Activities</strong> - Log your daily fitness activities</p>
                <p className="card-text mb-2">2. <strong>Join Teams</strong> - Create or join fitness teams</p>
                <p className="card-text mb-2">3. <strong>Compete</strong> - Compete on the leaderboard and earn points</p>
                <p className="card-text mb-0">4. <strong>Achieve Goals</strong> - Get personalized workout suggestions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
