import React, { useState, useEffect } from 'react';
import { getApiEndpoint, API_ENDPOINTS } from '../utils/api';

// Reference API endpoint: -8000.app.github.dev/api/workouts

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const url = getApiEndpoint('workouts');
        
        console.log('Fetching Workouts from:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts response:', data);
        
        // Handle both paginated and plain array responses
        const workoutsData = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Workouts data after processing:', workoutsData);
        
        setWorkouts(workoutsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const level = difficulty?.toLowerCase() || 'easy';
    if (level.includes('easy')) return 'bg-success';
    if (level.includes('medium') || level.includes('intermediate')) return 'bg-warning text-dark';
    if (level.includes('hard') || level.includes('advanced')) return 'bg-danger';
    return 'bg-secondary';
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading workouts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error!</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-lg-8">
          <h1 className="display-5 fw-bold text-dark">Workouts</h1>
          <p className="text-muted">Browse personalized workout suggestions and training plans</p>
        </div>
        <div className="col-lg-4 text-lg-end">
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createWorkoutModal">
            <i className="bi bi-plus-circle"></i> Create Workout
          </button>
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-info-circle"></i> No workouts found. Create your first workout!
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Workout Name</th>
                  <th scope="col">Description</th>
                  <th scope="col" className="text-center" style={{width: '120px'}}>Duration</th>
                  <th scope="col" className="text-center" style={{width: '130px'}}>Difficulty</th>
                  <th scope="col" className="text-center" style={{width: '120px'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout.id}>
                    <td><span className="badge bg-secondary">{workout.id}</span></td>
                    <td className="fw-semibold">{workout.name}</td>
                    <td className="text-muted">{workout.description || 'N/A'}</td>
                    <td className="text-center">
                      <span className="badge bg-light text-dark">{workout.duration || '0'} min</span>
                    </td>
                    <td className="text-center">
                      <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                        {workout.difficulty || 'N/A'}
                      </span>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-primary me-2" title="Start">Start</button>
                      <button className="btn btn-sm btn-outline-warning" title="Edit">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workouts;
