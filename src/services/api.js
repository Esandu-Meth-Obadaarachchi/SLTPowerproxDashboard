import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000' });

export const fetchNotifications = (userId) => API.get(`/notifications/${userId}`);
export const markAsViewed = (id) => API.patch(`/notifications/mark_viewed/${id}`);
export const deleteNotification = (id) => API.delete(`/notifications/${id}`);
export const sendNotification = (data) => API.post('/notifications/send', data);

// Mock notification data
// let notifications = [
//   {
//     id: 1,
//     title: "System Alert",
//     message: "System will be down for maintenance at midnight.",
//     timestamp: Date.now(),
//     viewed: false,
//   },
//   {
//     id: 2,
//     title: "Power Consumption Spike",
//     message: "Sudden spike in power consumption detected in Block B (Floor 1).",
//     timestamp: Date.now() - 2 * 60 * 1000, // 2 minutes ago
//     viewed: false,
//   },
//   {
//   id: 3,
//   title: "General Notification",
//   message: "New features have been added to the dashboard. Check them out in the Updates section.",
//   timestamp: Date.now() - 300000,
//   viewed: false,
// },
// ];

// // Simulate fetching notifications for a user
// export const fetchNotifications = async (userId) => {
//   return { data: notifications };
// };

// // Simulate deleting a notification
// export const deleteNotification = async (id) => {
//   notifications = notifications.filter((n) => n.id !== id);
//   return { success: true };
// };

// // Simulate marking a notification as viewed
// export const markAsViewed = async (id) => {
//   notifications = notifications.map((n) =>
//     n.id === id ? { ...n, viewed: true } : n
//   );
//   return { success: true };
// };