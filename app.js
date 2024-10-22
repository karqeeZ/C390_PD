const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'kcpgm0ka8vudfq76.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user: 'pheenscsy21jpqqu',
    password: 'htqewyo8l2ua5rug',
    database: 'qizribrriek917ev'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

function handleError(res, error, message) {
    console.error(message, error.message);
    return res.status(500).send(message);
}

// Route handlers
app.get('/', (req, res) => {
    const Sql = 'SELECT * FROM project';

    connection.query(Sql, (error, projectResults) => {
        if (error) return handleError(res, error, 'Error Retrieving project');

        res.render('index', { project : projectResults });
    });
});

app.get('/projects', (req, res) => {
    const Sql = 'SELECT * FROM project';

    connection.query(Sql, (error, projectResults) => {
        if (error) return handleError(res, error, 'Error Retrieving project');

        res.render('project', { project : projectResults });
    });
});

app.get('/about', (req, res) => {
    const Sql = 'SELECT * FROM me';

    connection.query(Sql, (error, aboutResults) => {
        if (error) return handleError(res, error, 'Error Retrieving about');

        res.render('about', { me : aboutResults });
    });
});

app.get('/contact', (req, res) => {
    const Sql = 'SELECT * FROM me';

    connection.query(Sql, (error, contactResults) => {
        if (error) return handleError(res, error, 'Error Retrieving contact');

        res.render('contact', { contact : contactResults });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});