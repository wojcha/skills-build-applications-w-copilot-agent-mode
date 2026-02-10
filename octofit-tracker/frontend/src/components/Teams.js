import React, { useState, useEffect } from 'react';
import { getApiEndpoint, API_ENDPOINTS } from '../utils/api';

// Reference API endpoint: -8000.app.github.dev/api/teams

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const url = getApiEndpoint('teams');
        
        console.log('Fetching Teams from:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams response:', data);
        
        // Handle both paginated and plain array responses
        const teamsData = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Teams data after processing:', teamsData);
        
        setTeams(teamsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading teams...</p>
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
          <h1 className="display-5 fw-bold text-dark">Teams</h1>
          <p className="text-muted">Create and manage your fitness teams</p>
        </div>
        <div className="col-lg-4 text-lg-end">
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTeamModal">
            <i className="bi bi-plus-circle"></i> Create Team
          </button>
        </div>
      </div>

      {teams.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-info-circle"></i> No teams found. Create your first team!
        </div>
      ) : (
        <div className="row g-4">
          {teams.map((team) => (
            <div key={team.id} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div>
                      <h5 className="card-title fw-bold">{team.name}</h5>
                      <p className="text-muted small mb-0">Team ID: {team.id}</p>
                    </div>
                    <span className="badge bg-primary">{team.members_count || 0} Members</span>
                  </div>
                  <p className="card-text text-muted">{team.description || 'No description available'}</p>
                  <hr />
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-primary btn-sm">View Team</button>
                    <button className="btn btn-outline-secondary btn-sm">Join Team</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
