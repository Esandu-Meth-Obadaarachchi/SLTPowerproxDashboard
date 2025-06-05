import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from 'react';
import { 
  AssetDistributionChart, 
  UPSLoadChart, 
  PowerConsumptionChart,
  upsLoadData
} from '../../../../shared/components/Charts';

// Status card component
const StatusCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Box sx={{ color: color }}>
            {icon}
          </Box>
        </Grid>
        <Grid item xs>
          <Typography variant="h6" component="div">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const AdminUPS = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filter UPS data for visualization
  const filteredUpsData = upsLoadData.filter(ups => ups.load > 0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        UPS Systems
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        Monitor and manage all UPS systems across all locations
      </Typography>
      
      {/* Status Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Total UPS Systems" 
            value="12" 
            icon={<BatteryChargingFullIcon fontSize="large" />} 
            color="primary.main" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Critical Status" 
            value="1" 
            icon={<ErrorIcon fontSize="large" />} 
            color="error.main" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Average Load" 
            value="68%" 
            icon={<BatteryChargingFullIcon fontSize="large" />} 
            color="info.main" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Total Capacity" 
            value="720 kVA" 
            icon={<BatteryChargingFullIcon fontSize="large" />} 
            color="success.main" 
          />
        </Grid>
      </Grid>
      
      {/* UPS Overview */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="UPS tabs">
            <Tab label="Overview" />
            <Tab label="Performance" />
            <Tab label="Maintenance" />
            <Tab label="Alarms" />
          </Tabs>
        </Box>
        
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                UPS Systems Status Distribution
              </Typography>
              <AssetDistributionChart 
                data={[
                  { name: 'Normal', value: 10 },
                  { name: 'Warning', value: 1 },
                  { name: 'Critical', value: 1 }
                ]} 
                height={300} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                UPS Load Distribution by Location
              </Typography>
              <UPSLoadChart data={filteredUpsData} height={300} />
            </Grid>
          </Grid>
        )}
        
        {tabValue === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                UPS Efficiency Trends (Last 30 Days)
              </Typography>
              <PowerConsumptionChart height={300} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                UPS Load Trends (Last 30 Days)
              </Typography>
              <PowerConsumptionChart height={300} />
            </Grid>
          </Grid>
        )}
        
        {tabValue === 2 && (
          <List>
            <ListItem>
              <ListItemText 
                primary="UPS-01 Battery Service" 
                secondary="Scheduled for tomorrow - HQ Data Center" 
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="UPS-03 Battery Replacement" 
                secondary="Scheduled for tomorrow - East Data Center" 
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="UPS-05 Annual Maintenance" 
                secondary="Scheduled for May 28 - West Data Center" 
              />
            </ListItem>
          </List>
        )}
        
        {tabValue === 3 && (
          <List>
            <ListItem>
              <ListItemIcon>
                <ErrorIcon color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Battery Failure - UPS-03" 
                secondary="East Data Center - 10:23 AM" 
              />
              <Typography variant="body2" color="error">
                Critical
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <WarningIcon color="warning" />
              </ListItemIcon>
              <ListItemText 
                primary="High Load (92%) - UPS-02" 
                secondary="HQ Data Center - 09:15 AM" 
              />
              <Typography variant="body2" color="warning.main">
                Warning
              </Typography>
            </ListItem>
          </List>
        )}
      </Paper>
      
      {/* UPS List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          UPS Systems
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="UPS-01 (Galaxy 7000)" 
              secondary="HQ Data Center - 85% Load - Normal" 
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="UPS-02 (Galaxy 7000)" 
              secondary="HQ Data Center - 92% Load - Warning" 
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="UPS-03 (Galaxy 7000)" 
              secondary="East Data Center - 0% Load - Critical (Battery Failure)" 
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="UPS-04 (Galaxy 5000)" 
              secondary="East Data Center - 65% Load - Normal" 
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="UPS-05 (Galaxy 5000)" 
              secondary="West Data Center - 72% Load - Normal" 
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default AdminUPS;
