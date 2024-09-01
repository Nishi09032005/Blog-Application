require("dotenv").config();
const cors = require('cors');
const express = require('express');
const path = require('path');  // Ensure path module is included
const connectDb = require('./utils/db');
const authRoutes = require('./router/authRoutes');
const categoryRoutes = require('./router/categories');
const imageRoutes = require('./router/imageRoutes');

const app = express();
const port = 4000;

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/api/user', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload-image', imageRoutes);

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
    process.exit(1);
});
