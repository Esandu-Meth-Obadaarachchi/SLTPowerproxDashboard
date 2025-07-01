import React from "react";

const ACTIVITY_LOGS_PER_PAGE = 5;

const ActivityLogTab = ({ activityLogs, activityPage, setActivityPage }) => {
  const totalActivityPages = Math.ceil(activityLogs.length / ACTIVITY_LOGS_PER_PAGE);
  const paginatedLogs = activityLogs.slice(
    (activityPage - 1) * ACTIVITY_LOGS_PER_PAGE,
    activityPage * ACTIVITY_LOGS_PER_PAGE
  );

  return (
    <div className="user-table hover-lift-glow">
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLogs.map((log, i) => (
            <tr key={i}>
              <td>{log.timestamp}</td>
              <td>
                <div className="user-info">
                  <div className="avatar">{log.name.charAt(0)}</div>
                  <div className="name">{log.name}</div>
                </div>
              </td>
              <td>{log.action}</td>
              <td>{log.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setActivityPage((prev) => Math.max(prev - 1, 1))}
          disabled={activityPage === 1}
        >
          ◀ Prev
        </button>
        <span>
          Page {activityPage} of {totalActivityPages}
        </span>
        <button
          onClick={() =>
            setActivityPage((prev) => Math.min(prev + 1, totalActivityPages))
          }
          disabled={activityPage === totalActivityPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default ActivityLogTab;
