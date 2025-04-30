import React, { useState, useEffect } from 'react';
import { UserRole } from '@/lib/types';
import { usePermissions } from '@/hooks/usePermissions';

interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  is_verified: boolean;
  date_joined: string;
  last_activity: string;
}

export const UserManagement: React.FC = () => {
  const { isAdmin, canManageUsers } = usePermissions();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Here you would typically make an API call to fetch users
      // For now, we'll use mock data
      const mockUsers: User[] = [
        {
          id: '1',
          username: 'john_doe',
          email: 'john@example.com',
          role: UserRole.BUYER,
          is_verified: true,
          date_joined: '2024-01-01',
          last_activity: '2024-03-15'
        },
        {
          id: '2',
          username: 'jane_smith',
          email: 'jane@example.com',
          role: UserRole.SELLER,
          is_verified: true,
          date_joined: '2024-01-15',
          last_activity: '2024-03-14'
        }
      ];
      setUsers(mockUsers);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      // Here you would typically make an API call to update the user's role
      console.log('Updating role:', { userId, newRole });
      
      // Update local state
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      
      setShowRoleModal(false);
    } catch (err) {
      setError('Failed to update user role');
    }
  };

  if (!isAdmin() || !canManageUsers()) {
    return (
      <div className="alert alert-error">
        You don't have permission to access this page.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">User Management</h2>
          
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Verified</th>
                  <th>Joined</th>
                  <th>Last Activity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${
                        user.role === UserRole.ADMIN
                          ? 'badge-primary'
                          : user.role === UserRole.SELLER
                          ? 'badge-secondary'
                          : 'badge-accent'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        user.is_verified ? 'badge-success' : 'badge-warning'
                      }`}>
                        {user.is_verified ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                    <td>{new Date(user.last_activity).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowRoleModal(true);
                        }}
                      >
                        Change Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Change User Role</h3>
            <p className="py-4">
              Change role for user: {selectedUser.username}
            </p>
            <div className="form-control">
              <select
                className="select select-bordered w-full"
                value={selectedUser.role}
                onChange={(e) => handleRoleChange(selectedUser.id, e.target.value as UserRole)}
              >
                {(Object.values(UserRole) as UserRole[]).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowRoleModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 