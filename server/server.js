const express = require('express');
const cors = require('cors');
const multer = require('multer');


const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({"storage": storage})

const port = 5000;

app.post('/data', upload.single('img'), (req, res) => {
    if(req.get('Content-Type') == "application/json") {
        const data = req.body;
        console.log(`Type: ${data.type}\nData: ${data.data}`);
    }
    else {
        console.log(req.file);
        console.log(req.get('Content-Type'));
    }
})

app.listen(port, () => `Listening on port ${port}`);