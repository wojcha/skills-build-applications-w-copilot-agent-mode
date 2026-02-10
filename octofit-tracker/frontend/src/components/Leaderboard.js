import React, { useState, useEffect } from 'react';
import { getApiEndpoint, API_ENDPOINTS } from '../utils/api';

// Reference API endpoint: -8000.app.github.dev/api/leaderboard

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const url = getApiEndpoint('leaderboard');
        
        console.log('Fetching Leaderboard from:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard response:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardList = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Leaderboard data after processing:', leaderboardList);
        
        setLeaderboardData(leaderboardList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading leaderboard...</p>
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
        <div className="col-lg-12">
          <h1 className="display-5 fw-bold text-dark">Leaderboard</h1>
          <p className="text-muted">Compete with your friends and see who tops the rankings</p>
        </div>
      </div>

      {leaderboardData.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-info-circle"></i> No leaderboard data available yet.
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col" style={{width: '80px'}}>Rank</th>
                  <th scope="col">User</th>
                  <th scope="col" className="text-end" style={{width: '150px'}}>Points</th>
                  <th scope="col" className="text-end" style={{width: '150px'}}>Score</th>
                  <th scope="col" className="text-center" style={{width: '100px'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => {
                  const rank = index + 1;
                  let rankBadge = 'bg-secondary';
                  if (rank === 1) rankBadge = 'bg-warning text-dark';
                  else if (rank === 2) rankBadge = 'bg-light text-dark';
                  else if (rank === 3) rankBadge = 'bg-danger';

                  return (
                    <tr key={entry.id || index} className={rank <= 3 ? 'table-active' : ''}>
                      <td>
                        <span className={`badge ${rankBadge} fs-6`}>
                          {rank === 1 && '🥇'}
                          {rank === 2 && '🥈'}
                          {rank === 3 && '🥉'}
                          {rank > 3 && rank}
                        </span>
                      </td>
                      <td className="fw-semibold">{entry.user_name || entry.user || 'Anonymous'}</td>
                      <td className="text-end">
                        <span className="badge bg-info">{entry.points || 0}</span>
                      </td>
                      <td className="text-end">
                        <strong>{entry.score || 0}</strong>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary" title="View Profile">View</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
