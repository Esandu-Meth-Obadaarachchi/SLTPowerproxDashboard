export const sendNativeNotification = (title, body) => {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else {
    console.warn("Notification permission not granted.");
  }
};
