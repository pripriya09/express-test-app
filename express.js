import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS)
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// Route to render form page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// Route to handle form submission and display result
app.post('/submit', (req, res) => {
    const formData = req.body; // Extract form data from the request

    // Serve the result page dynamically with the form data
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/css/styles.css">
            <title>Submission Result</title>
        </head>
        <body>
            <div class="container">
                <h1>Form Submitted Successfully!</h1>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <a href="/">Go Back to Form</a>
            </div>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
