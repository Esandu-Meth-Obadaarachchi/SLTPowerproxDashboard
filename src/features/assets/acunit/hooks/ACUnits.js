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
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from 'react';
import { 
  AssetDistributionChart, 
  ACTemperatureChart, 
  PowerConsumptionChart,
  acTemperatureData
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

const AdminACUnits = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Precision AC Units
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        Monitor and manage all precision AC units across all locations
      </Typography>
      
      {/* Status Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Total AC Units" 
            value="18" 
            icon={<AcUnitIcon fontSize="large" />} 
            color="primary.main" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Warning Status" 
            value="1" 
            icon={<WarningIcon fontSize="large" />} 
            color="warning.main" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Average Temp" 
            value="22.4°C" 
            icon={<AcUnitIcon fontSize="large" />} 
            color="info.main" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Total Capacity" 
            value="630 kW" 
            icon={<AcUnitIcon fontSize="large" />} 
            color="success.main" 
          />
        </Grid>
      </Grid>
      
      {/* AC Units Overview */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="AC Units tabs">
            <Tab label="Overview" />
            <Tab label="Cooling" />
            <Tab label="Electrical" />
            <Tab label="Alarms" />
          </Tabs>
        </Box>
        
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                AC Units Status Distribution
              </Typography>
              <AssetDistributionChart 
                data={[
                  { name: 'Normal', value: 16 },
                  { name: 'Warning', value: 2 },
                  { name: 'Critical', value: 0 }
                ]} 
                height={300} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Temperature Distribution by Location
              </Typography>
              <ACTemperatureChart data={acTemperatureData} height={300} />
            </Grid>
          </Grid>
        )}
        
        {tabValue === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Temperature Trends (Last 30 Days)
              </Typography>
              <PowerConsumptionChart height={300} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Humidity Trends (Last 30 Days)
              </Typography>
              <PowerConsumptionChart height={300} />
            </Grid>
          </Grid>
        )}
        
        {tabValue === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Power Consumption Trends (Last 30 Days)
              </Typography>
              <PowerConsumptionChart height={300} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Efficiency Metrics (Last 30 Days)
              </Typography>
              <PowerConsumptionChart height={300} />
            </Grid>
          </Grid>
        )}
        
        {tabValue === 3 && (
          <List>
            <ListItem>
              <ListItemIcon>
                <WarningIcon color="warning" />
              </ListItemIcon>
              <ListItemText 
                primary="High Temperature - CRAC-07" 
                secondary="North Data Center - 09:45 AM" 
              />
              <Typography variant="body2" color="warning.main">
                Warning
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <WarningIcon color="warning" />
              </ListItemIcon>
              <ListItemText 
                primary="Filter Replacement Due - CRAC-02" 
                secondary="HQ Data Center - 3 days remaining" 
              />
              <Typography variant="body2" color="warning.main">
                Warning
              </Typography>
            </ListItem>
          </List>
        )}
      </Paper>
      
      {/* AC Units List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Precision AC Units
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="CRAC-01" 
              secondary="East Data Center - 22.5°C / 45% RH - Normal" 
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="CRAC-02" 
              secondary="HQ Data Center - 21.8°C / 42% RH - Warning (Filter)" 
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="CRAC-03" 
              secondary="HQ Data Center - 22.2°C / 43% RH - Normal" 
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="CRAC-07" 
              secondary="North Data Center - 24.8°C / 48% RH - Warning (High Temp)" 
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="CRAC-08" 
              secondary="North Data Center - 22.6°C / 44% RH - Normal" 
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default AdminACUnits;
