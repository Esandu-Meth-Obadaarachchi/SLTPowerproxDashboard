import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './components/card';
import { Table } from './components/table';
import { Input } from './components/input';
import { Badge } from './components/badge';
import { ScrollArea } from './components/scroll-area';
import '../../styles/Pages/RoomAccessControl/RoomAccessControl.css';

// Predefined locations
const predefinedLocations = [
  'SLT HQ',
  'SLT WELIKADA A',
  'SLT WELIKADA B',
  'SLT OTS',
  'Regional WPN- 1',
  'Regional WPN- 2'
];

// Dummy data for rooms
const dummyRooms = Array.from({ length: 16 }, (_, i) => ({
  id: `R${(i + 1).toString().padStart(2, '0')}`,
  name: `Network Room ${i + 1}`,
  location: predefinedLocations[i % predefinedLocations.length],
  occupied: Math.random() > 0.5,
  occupants: Math.random() > 0.5 ? [
    { name: 'Nimal Perera' },
    { name: 'Thushari Wijesinghe' }
  ] : [],
  lastAccess: '2025-07-23T10:05:00'
}));

// Dummy data for logs
const dummyLogs = [
  {
    time: '2025-07-23T10:05:00',
    room: 'R01',
    name: 'Nimal Perera',
    action: 'Entry',
    status: 'Granted',
    location: 'SLT HQ'
  },
  {
    time: '2025-07-23T09:42:00',
    room: 'R02',
    name: 'Thushari W.',
    action: 'Exit',
    status: 'Granted',
    location: 'SLT WELIKADA A'
  },
  {
    time: '2025-07-23T08:15:00',
    room: 'R03',
    name: 'Dinesh Silva',
    action: 'Entry',
    status: 'Denied',
    location: 'SLT OTS'
  }
];

const RoomAccessControl = () => {
  const [rooms, setRooms] = useState(dummyRooms);
  const [logs, setLogs] = useState(dummyLogs);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');

  useEffect(() => {
    // TODO: Replace with backend API call
  }, []);

  // Filter logs by search and location
  const filteredLogs = logs.filter(log =>
    (locationFilter === 'All' || log.location === locationFilter) &&
    (
      log.name.toLowerCase().includes(search.toLowerCase()) ||
      log.room.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Always include all predefined locations in filter
  const locationOptions = ['All', ...predefinedLocations];

  return (
    <div className="room-access-container">
      <h1 className="page-title">Room Access Control</h1>

      {/* Live Room Grid */}
      <div className="room-grid">
        {rooms.map((room) => (
          <Card key={room.id} className="room-card">
            <CardContent>
              <div className="room-title">{room.name}</div>
              <div className="room-status">
                Status:{' '}
                {room.occupied ? (
                  <Badge className="status-badge occupied">Occupied</Badge>
                ) : (
                  <Badge className="status-badge vacant">Vacant</Badge>
                )}
              </div>
              <div className="room-subtitle">People Inside:</div>
              <ul className="room-list">
                {room.occupants.length > 0
                  ? room.occupants.map((p, i) => <li key={i}>{p.name}</li>)
                  : <li>–</li>}
              </ul>
              <div className="last-access">
                Last Access: {new Date(room.lastAccess).toLocaleTimeString()}
              </div>
              <div className="room-location">
                Location: {room.location}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Access History */}
      <div className="access-history">
        <h2 className="section-title">Access History</h2>

        {/* Filter and Search Bar */}
        <div className="filter-bar">
          <Input
            placeholder="Search by name, room or action..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="location-filter"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            {locationOptions.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <ScrollArea className="log-scroll-area">
          <Table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Room</th>
                <th>Name</th>
                <th>Action</th>
                <th>Status</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr key={index}>
                  <td>{new Date(log.time).toLocaleString()}</td>
                  <td>{log.room}</td>
                  <td>{log.name}</td>
                  <td>{log.action}</td>
                  <td>{log.status}</td>
                  <td>{log.location}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default RoomAccessControl;
