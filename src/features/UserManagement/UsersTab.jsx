import React from "react";

const UsersTab = ({
  users,
  currentPage,
  setCurrentPage,
  handleAddUser,
  showAddUserPanel,
  setShowAddUserPanel,
  newUserName,
  newUserRole,
  newUserRegion,
  setNewUserName,
  setNewUserRole,
  setNewUserRegion,
  handleSubmitNewUser,
  USERS_PER_PAGE,
}) => {
  const paginatedUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );
  const totalUserPages = Math.ceil(users.length / USERS_PER_PAGE);

  return (
    <>
      {/* Search, filter, add */}
      <div className="toolbar-container hover-lift-glow">
        <input
          type="text"
          placeholder="🔍 Search users..."
          className="search-input"
        />
        <select className="dropdown">
          <option>Viewer</option>
          <option>Administrator</option>
          <option>HQ Staff</option>
          <option>Technician</option>
          <option>Regional</option>
        </select>
        <select className="dropdown">
          <option>All Regions</option>
        </select>
        <select className="dropdown">
          <option>Active</option>
          <option>InActive</option>
        </select>
        <button
          className="add-user-btn hover-lift-glow"
          onClick={handleAddUser}
        >
          👤 ADD USER
        </button>
      </div>

      {/* Popup */}
      {showAddUserPanel && (
        <div className="popup-overlay">
          <div className="popup-panel">
            <h3>Add New User</h3>
            <label>
              Name:
              <input
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </label>
            <label>
              Role:
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
              >
                <option value="">Select</option>
                <option>Viewer</option>
                <option>Administrator</option>
                <option>HQ Staff</option>
                <option>Technician</option>
                <option>Regional</option>
              </select>
            </label>
            <label>
              Region:
              <input
                value={newUserRegion}
                onChange={(e) => setNewUserRegion(e.target.value)}
              />
            </label>
            <div className="popup-buttons">
              <button onClick={handleSubmitNewUser}>Add User</button>
              <button onClick={() => setShowAddUserPanel(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="user-table hover-lift-glow">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Regions</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, i) => (
              <tr key={i}>
                <td>
                  <div className="user-info">
                    <div className="avatar">{user.name.charAt(0)}</div>
                    <div>
                      <div className="name">{user.name}</div>
                      <div className="email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.roleIcon} {user.role}
                </td>
                <td>
                  {user.regions.map((r, i) => (
                    <span key={i} className="region-badge">
                      📍 {r}
                    </span>
                  ))}
                </td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <button className="action-btn">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>
          <span>
            Page {currentPage} of {totalUserPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalUserPages))
            }
            disabled={currentPage === totalUserPages}
          >
            Next ▶
          </button>
        </div>
      </div>
    </>
  );
};

export default UsersTab;
