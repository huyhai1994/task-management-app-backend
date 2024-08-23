const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect Database
connectDB().then(r => {
    console.log('Database connected')
});

// Init Middleware
app.use(express.json({extended: false}));

// Define Routes
app.use('/api/users', userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});