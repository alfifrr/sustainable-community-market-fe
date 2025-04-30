import React, { useState } from 'react';
import { UserRole, Permission, RolePermissions } from '@/lib/types';
import { usePermissions } from '@/hooks/usePermissions';

interface RoleManagementProps {
  onRoleUpdate?: (userId: string, newRole: UserRole) => void;
}

export const RoleManagement: React.FC<RoleManagementProps> = ({ onRoleUpdate }) => {
  const { isAdmin } = usePermissions();
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.BUYER);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);

  if (!isAdmin()) {
    return (
      <div className="alert alert-error">
        You don't have permission to access this page.
      </div>
    );
  }

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setSelectedPermissions(RolePermissions[role]);
  };

  const handlePermissionToggle = (permission: Permission) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permission)) {
        return prev.filter(p => p !== permission);
      }
      return [...prev, permission];
    });
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the role permissions
    console.log('Saving role permissions:', {
      role: selectedRole,
      permissions: selectedPermissions
    });
  };

  return (
    <div className="space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Role Management</h2>
          
          {/* Role Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Role</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value as UserRole)}
            >
              {(Object.values(UserRole) as UserRole[]).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Permissions Management */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {(Object.values(Permission) as Permission[]).map((permission) => (
                <label key={permission} className="label cursor-pointer">
                  <span className="label-text">{permission}</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedPermissions.includes(permission)}
                    onChange={() => handlePermissionToggle(permission)}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 