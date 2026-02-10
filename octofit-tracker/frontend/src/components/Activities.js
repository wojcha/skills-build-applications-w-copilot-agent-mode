import React, { useState, useEffect } from 'react';
import { getApiEndpoint } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const url = getApiEndpoint('activities');
        
        console.log('Fetching Activities from:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities response:', data);
        
        // Handle both paginated and plain array responses
        const activitiesData = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Activities data after processing:', activitiesData);
        
        setActivities(activitiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading activities...</p>
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
          <h1 className="display-5 fw-bold text-dark">Activities</h1>
          <p className="text-muted">Track and manage your fitness activities</p>
        </div>
        <div className="col-lg-4 text-lg-end">
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addActivityModal">
            <i className="bi bi-plus-circle"></i> Add Activity
          </button>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-info-circle"></i> No activities found. Start by adding a new activity!
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Activity Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Type</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td><span className="badge bg-secondary">{activity.id}</span></td>
                    <td className="fw-semibold">{activity.name}</td>
                    <td className="text-muted">{activity.description || 'N/A'}</td>
                    <td><span className="badge bg-info text-dark">{activity.type}</span></td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-primary me-2" title="View">View</button>
                      <button className="btn btn-sm btn-outline-warning me-2" title="Edit">Edit</button>
                      <button className="btn btn-sm btn-outline-danger" title="Delete">Delete</button>
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

export default Activities;
