const express = require('express');
const multer = require('multer');
const app = express();
const port = 5000;

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
    cb(null, 'uploads/');
 },
 filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
 },
});

const upload = multer({
 storage: storage,
 limits: {
    fileSize: 1000000, // ограничение размера файла - 1 МБ
 },
});

app.get('/', (req, res) => {
 res.send(`
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file">
      <input type="submit" value="Upload">
    </form>
 `);
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.send(`
       <!doctype html>
       <title>File Uploaded and Ready to Download</title>
       <h1>File Uploaded and Ready to Download</h1>
       <a href="/download/${req.file.filename}">Download ${req.file.originalname}</a>
    `);
   });

app.get('/download/:filename', (req, res) => {
 res.download('uploads/' + req.params.filename);
});

app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`);
});