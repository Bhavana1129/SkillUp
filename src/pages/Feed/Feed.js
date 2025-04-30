
import React, { useState, useEffect } from 'react';

const Feed = () => {
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const fetchFeeds = async () => {
            const response = await fetch('/api/feed');
            const data = await response.json();
            setFeeds(data);
        };
        fetchFeeds();
    }, []);

    const saveForLater = (feed) => {
        alert('Saved for later: ' + feed.title);
    };

    const reportContent = (feed) => {
        alert('Reported: ' + feed.title);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Educational Feeds</h2>
            <div className="grid grid-cols-3 gap-4">
                {feeds.map((feed, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                        <h3 className="font-semibold">{feed.title}</h3>
                        <p>{feed.source}</p>
                        <div className="flex justify-between mt-2">
                            <button onClick={() => saveForLater(feed)} className="btn btn-primary">Save</button>
                            <button onClick={() => reportContent(feed)} className="btn btn-danger">Report</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
    