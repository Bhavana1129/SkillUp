
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Setup Redis client
const redisClient = redis.createClient({ host: 'localhost', port: 6379 });
redisClient.on('error', (err) => console.log('Redis error:', err));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

// Routes setup
const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');
const creditsRoutes = require('./routes/credits');
const adminRoutes = require('./routes/admin');
app.use('/api/auth', authRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/credits', creditsRoutes);
app.use('/api/admin', adminRoutes);

// Feed Cache Middleware
app.use('/api/feed', (req, res, next) => {
    redisClient.get('feeds', (err, cachedFeeds) => {
        if (cachedFeeds) {
            return res.json(JSON.parse(cachedFeeds));  // Return cached feeds
        }
        next();  // Proceed to fetch from the external API if no cache exists
    });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
    