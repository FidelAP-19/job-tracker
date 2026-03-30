const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

const db = require('./models');

// Import routers
const applicationRoutes = require('./routes/applicationRoutes');
const companyRoutes = require('./routes/companyRoutes'); 
const interviewRoundRoutes = require('./routes/interviewRoundRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());

//Health check route: confirm server is running
app.get('/', (req, res) => {
    res.json({ message: 'Job Tracker API is running.' });
});

// Mount routers — every route in applicationRoutes is prefixed with /api/applications
app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes); 
app.use('/api/interview-rounds', interviewRoundRoutes);
app.use('/api/contacts', contactRoutes);

//Test DB Connection & Start Server
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established.');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });