
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const redisClient = require('redis').createClient();

// Example aggregated feeds (mocked)
const getAggregatedFeeds = async () => {
    const feeds = [
        { title: 'Feed 1', source: 'Twitter', url: 'https://twitter.com' },
        { title: 'Feed 2', source: 'Reddit', url: 'https://reddit.com' },
        { title: 'Feed 3', source: 'LinkedIn', url: 'https://linkedin.com' },
    ];
    return feeds;
};

router.get('/', async (req, res) => {
    const feeds = await getAggregatedFeeds();
    redisClient.setex('feeds', 3600, JSON.stringify(feeds));  // Cache feeds for 1 hour
    res.json(feeds);
});

module.exports = router;
    