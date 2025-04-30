
const express = require('express');
const router = express.Router();

// Mock notification system (console log for now)
const sendNotification = (message) => {
    console.log('New notification:', message);
};

// Route for admin to view reported content (mock)
router.post('/report', (req, res) => {
    const { reportType, contentId, userId } = req.body;
    sendNotification(`Content with ID: ${contentId} has been reported by user: ${userId} for reason: ${reportType}`);
    res.status(200).send('Report submitted and notification sent');
});

module.exports = router;
    