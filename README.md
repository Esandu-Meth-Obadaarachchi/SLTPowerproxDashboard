# CopyPublishSLTPowerprox Dashboard

A React-based dashboard application for monitoring and visualizing power data with real-time analytics, built with Material-UI and integrated with InfluxDB and Firebase.
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16 or higher) - Download here
npm (comes with Node.js) or yarn

Getting Started
1. Install Dependencies

    `npm install`

This will install all required packages listed in package.json, including:

React 19
Material-UI (MUI)
InfluxDB Client
Firebase
Recharts
React Router
And more...

### Available Scripts

`npm start`
Runs the app in development mode.
Will Auto open the browser if not,
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.


`npm test`
Launches the test runner in interactive watch mode.
See the section about running tests for more information.


`npm run build`
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes. Your app is ready to be deployed!


`npm run deploy`
Deploys the application to GitHub Pages.
Make sure you've run npm run build first, or use this command which runs the build automatically before deployment.

### Project Structure

dashboard/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
├── package.json
├── package-lock.json
└── README.md


### Key Features

- Real-time data visualization with Recharts
- Interactive maps with Google Maps API
- Material-UI component library
- Firebase authentication and database
- InfluxDB integration for time-series data
- Responsive carousel displays
- Gauge charts and progress indicators


### Troubleshooting

Dependencies Not Installing
If you encounter issues during `npm install`:

# 1.Clear npm cache
`npm cache clean --force`

# 2.Delete node_modules and package-lock.json
`rm -rf node_modules package-lock.json`

# 3.Reinstall
`npm install`

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Port Already in Use
If port 3000 is already in use:

# On Windows
`netstat -ano | findstr :3000`
`taskkill /PID <PID> /F`

# On Mac/Linux
`lsof -ti:3000 | xargs kill -9`

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Build Fails
If `npm run build` fails:

# Check that all environment variables are set correctly
# Ensure you have sufficient disk space
# Try clearing the cache: `npm cache clean --force`


### Learn More

[Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
[React Documentation](https://reactjs.org/)
[Material-UI documentation](https://mui.com/)
[InfluxDB Client documentation](https://docs.influxdata.com/influxdb/cloud/api-guide/client-libraries/nodejs/)
[Firebase documentation](https://firebase.google.com/docs)


### Contributing

# 1. Fork the repository
# 2. Create your feature branch (`git checkout -b feature/Feature`)
# 3. Commit your changes (`git commit -m 'Add some Feature'`)
# 4. Push to the branch (`git push origin feature/Feature`)
# 5. Open a Pull Request


### License
This project is private and proprietary.