import React, { useState, useEffect } from 'react';
import { getApiEndpoint } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = getApiEndpoint('users');
        
        console.log('Fetching Users from:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users response:', data);
        
        // Handle both paginated and plain array responses
        const usersData = data.results ? data.results : Array.isArray(data) ? data : [];
        console.log('Users data after processing:', usersData);
        
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading users...</p>
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
          <h1 className="display-5 fw-bold text-dark">Users</h1>
          <p className="text-muted">View and manage user profiles</p>
        </div>
        <div className="col-lg-4 text-lg-end">
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
            <i className="bi bi-plus-circle"></i> Add User
          </button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-info-circle"></i> No users found.
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td><span className="badge bg-secondary">{user.id}</span></td>
                    <td className="fw-semibold">{user.username}</td>
                    <td>{user.first_name} {user.last_name}</td>
                    <td>
                      <a href={`mailto:${user.email}`} className="text-decoration-none">
                        {user.email}
                      </a>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-primary me-2" title="View Profile">View</button>
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

export default Users;
