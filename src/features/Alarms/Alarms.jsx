// // import React, { useState, useEffect } from 'react';
// // import {
// //   Card,
// //   CardContent,
// //   Typography,
// //   IconButton,
// //   Collapse
// // } from '@mui/material';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import { fetchNotifications, deleteNotification, markAsViewed } from '../../services/api';
// // import { onAuthStateChanged } from 'firebase/auth';
// // import { getToken } from 'firebase/messaging';
// // import axios from 'axios';
// // import { auth, messaging } from '../../firebase'; // adjust path as needed

// // const AlarmCard = ({ alarm, onRefresh }) => {
// //   const [expanded, setExpanded] = useState(false);

// //   const handleExpand = () => {
// //     setExpanded(!expanded);
// //     if (!alarm.viewed) {
// //       markAsViewed(alarm.id).catch(err => console.error("Mark as viewed error:", err));
// //     }
// //   };

// //   return (
// //     <Card sx={{ mb: 2, backgroundColor: '#1e1e1e', color: 'white', position: 'relative' }}>
// //       <CardContent onClick={handleExpand} style={{ cursor: 'pointer' }}>
// //         <Typography variant="h6">{alarm.title}</Typography>
// //         <Typography variant="body2">
// //           {expanded ? alarm.message : `${alarm.message.slice(0, 60)}...`}
// //         </Typography>
// //         <Typography variant="caption" sx={{ color: 'lightgreen' }}>
// //           {new Date(alarm.timestamp).toLocaleString()}
// //         </Typography>
// //       </CardContent>
// //       <Collapse in={expanded}>
// //         <CardContent>
// //           <Typography>{alarm.message}</Typography>
// //         </CardContent>
// //       </Collapse>
// //       <IconButton
// //         onClick={() => {
// //           deleteNotification(alarm.id)
// //             .then(onRefresh)
// //             .catch(err => console.error("Delete notification error:", err));
// //         }}
// //         sx={{ position: 'absolute', top: 10, right: 10, color: 'red' }}
// //       >
// //         <DeleteIcon />
// //       </IconButton>
// //     </Card>
// //   );
// // };

// // const Alarms = () => {
// //   const [alarms, setAlarms] = useState([]);
// //   const [userUUID, setUserUUID] = useState(null);

// //   const loadAlarms = async (uuid) => {
// //     if (!uuid) return;
// //     try {
// //       const res = await fetchNotifications(uuid);
// //       setAlarms(res.data);
// //     } catch (error) {
// //       console.error("Error loading alarms:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// //       if (user) {
// //         const uuid = user.uid;
// //         setUserUUID(uuid);

// //         try {
// //           const permission = await Notification.requestPermission();
// //           if (permission === "granted") {
// //             const token = await getToken(messaging, {
// //               vapidKey: "BO0sB5bwjmuj8Rpl4TROoOyPTEFPNqKHu_F9_4VVyWmDFAQIBdqzkIIaFAwGxbpsdzQs7cZuQdPFBMnXJoQYQYo",
// //             });
// //             if (token) {
// //               try {
// //                 await axios.post(
// //                   "http://localhost:8000/register_token/",
// //                   { uuid, token },
// //                   { headers: { 'Content-Type': 'application/json' } }
// //                 );
// //                 console.log("FCM token registered:", token);
// //               } catch (postErr) {
// //                 console.error("Error posting FCM token:", postErr.response || postErr.message || postErr);
// //               }
// //             } else {
// //               console.warn("No FCM token received.");
// //             }
// //           } else {
// //             console.warn("Notification permission not granted");
// //           }
// //         } catch (fcmErr) {
// //           console.error("FCM setup error:", fcmErr);
// //         }

// //         loadAlarms(uuid);
// //       } else {
// //         console.warn("User not logged in.");
// //       }
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   return (
// //     <div style={{ padding: 16, background: '#2c2c2c', minHeight: '100vh' }}>
// //       <Typography variant="h5" color="white" sx={{ mb: 2 }}>Alarms</Typography>
// //       {alarms.map((alarm) => (
// //         <AlarmCard key={alarm.id} alarm={alarm} onRefresh={() => loadAlarms(userUUID)} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default Alarms;

// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Collapse,
//   Button,
//   Stack,
//   Badge
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { fetchNotifications, deleteNotification, markAsViewed } from '../../services/api';
// import { onAuthStateChanged } from 'firebase/auth';
// import { getToken } from 'firebase/messaging';
// import axios from 'axios';
// import { auth, messaging } from '../../firebase';

// const AlarmCard = ({ alarm, onRefresh }) => {
//   const [expanded, setExpanded] = useState(false);

//   const handleExpand = () => {
//     setExpanded(!expanded);
//     if (!alarm.viewed) {
//       markAsViewed(alarm.id)
//         .then(onRefresh)
//         .catch(err => console.error("Mark as viewed error:", err));
//     }
//   };

//   return (
//     <Card
//       sx={{
//         mb: 2,
//         backgroundColor: alarm.viewed ? '#1e1e1e' : '#333333',
//         color: 'white',
//         position: 'relative',
//         borderLeft: alarm.viewed ? 'none' : '4px solid orange'
//       }}
//     >
//       <CardContent onClick={handleExpand} style={{ cursor: 'pointer' }}>
//         <Typography variant="h6">{alarm.title}</Typography>
//         <Typography variant="body2">
//           {expanded ? alarm.message : `${alarm.message.slice(0, 60)}...`}
//         </Typography>
//         <Typography variant="caption" sx={{ color: 'lightgreen' }}>
//           {new Date(alarm.timestamp).toLocaleString()}
//         </Typography>
//       </CardContent>
//       <Collapse in={expanded}>
//         <CardContent>
//           <Typography>{alarm.message}</Typography>
//         </CardContent>
//       </Collapse>
//       <IconButton
//         onClick={() => {
//           deleteNotification(alarm.id)
//             .then(onRefresh)
//             .catch(err => console.error("Delete notification error:", err));
//         }}
//         sx={{ position: 'absolute', top: 10, right: 10, color: 'red' }}
//       >
//         <DeleteIcon />
//       </IconButton>
//     </Card>
//   );
// };

// const Alarms = () => {
//   const [alarms, setAlarms] = useState([]);
//   const [userUUID, setUserUUID] = useState(null);
//   const [filter, setFilter] = useState('all');

//   const loadAlarms = async (uuid) => {
//     if (!uuid) return;
//     try {
//       const res = await fetchNotifications(uuid);
//       setAlarms(res.data);
//     } catch (error) {
//       console.error("Error loading alarms:", error);
//     }
//   };

//   const unreadCount = alarms.filter(a => !a.viewed).length;

//   const filteredAlarms = alarms.filter(alarm => {
//     if (filter === 'unread') return !alarm.viewed;
//     if (filter === 'read') return alarm.viewed;
//     return true;
//   });

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const uuid = user.uid;
//         setUserUUID(uuid);

//         try {
//           const permission = await Notification.requestPermission();
//           if (permission === "granted") {
//             const token = await getToken(messaging, {
//               vapidKey: "BO0sB5bwjmuj8Rpl4TROoOyPTEFPNqKHu_F9_4VVyWmDFAQIBdqzkIIaFAwGxbpsdzQs7cZuQdPFBMnXJoQYQYo",
//             });
//             if (token) {
//               try {
//                 await axios.post(
//                   "http://localhost:8000/register_token/",
//                   { uuid, token },
//                   { headers: { 'Content-Type': 'application/json' } }
//                 );
//                 console.log("FCM token registered:", token);
//               } catch (postErr) {
//                 console.error("Error posting FCM token:", postErr.response || postErr.message || postErr);
//               }
//             } else {
//               console.warn("No FCM token received.");
//             }
//           } else {
//             console.warn("Notification permission not granted");
//           }
//         } catch (fcmErr) {
//           console.error("FCM setup error:", fcmErr);
//         }

//         loadAlarms(uuid);
//       } else {
//         console.warn("User not logged in.");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <div style={{ padding: 16, background: '#2c2c2c', minHeight: '100vh' }}>
//       <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
//         <Typography variant="h5" color="white">
//           Notifications
//           {unreadCount > 0 && (
//             <Badge badgeContent={unreadCount} color="error" sx={{ ml: 1 }} />
//           )}
//         </Typography>
//         <Button
//           variant={filter === 'all' ? 'contained' : 'outlined'}
//           onClick={() => setFilter('all')}
//         >
//           All
//         </Button>
//         <Button
//           variant={filter === 'unread' ? 'contained' : 'outlined'}
//           onClick={() => setFilter('unread')}
//         >
//           Unread
//         </Button>
//         <Button
//           variant={filter === 'read' ? 'contained' : 'outlined'}
//           onClick={() => setFilter('read')}
//         >
//           Read
//         </Button>
//       </Stack>

//       {filteredAlarms.map((alarm) => (
//         <AlarmCard key={alarm.id} alarm={alarm} onRefresh={() => loadAlarms(userUUID)} />
//       ))}
//     </div>
//   );
// };

// export default Alarms;
