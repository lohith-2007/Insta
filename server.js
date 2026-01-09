const express = require('express');
const cors = require('cors');
const instagramUrlDirect = require('instagram-url-direct'); // Example library (install via npm)

const app = express();
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON bodies

app.post('/download', async (req, res) => {
    const { url } = req.body; // Get the URL from the request body
    
    if (!url) {
        return res.json({ success: false, error: 'No URL provided' });
    }
    
    try {
        // Use the library to get the direct video URL
        const videoInfo = await instagramUrlDirect(url); // This is hypothetical; adjust based on the library
        const downloadLink = videoInfo.video; // Assuming the library returns a video URL
        
        res.json({ success: true, downloadLink: downloadLink });
    } catch (error) {
        res.json({ success: false, error: 'Failed to fetch video. Please check the URL or try again later.' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
