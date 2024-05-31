const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); 

app.post('/submit', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, 'data', 'formData.json');

    fs.mkdir(path.join(__dirname, 'data'), { recursive: true }, (err) => {
        if (err) throw err;

        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            } else {
                res.status(200).json({ success: true, message: 'Form submitted successfully!' });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
