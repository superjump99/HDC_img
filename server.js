const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'input','HYUNDAI','images')));

// Route to get the total number of images
app.get('/image_count', (req, res) => {
    const imageDirectories = ['CAM_FRONT_LEFT', 'CAM_FRONT', 'CAM_FRONT_RIGHT'];
    let imageCount = {};

    imageDirectories.forEach(dir => {
        const imageDirPath = path.join(__dirname, 'input', 'HYUNDAI','images', dir);
        const images = fs.readdirSync(imageDirPath).filter(file => file.endsWith('.jpg'));
        imageCount[dir] = images.length;
    });

    res.json(imageCount);
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'imagetool.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
