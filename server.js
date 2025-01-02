const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Define absolute path to public directory
const PUBLIC_PATH = path.join(__dirname, 'public');

console.log('Server starting...');
console.log('Public directory:', PUBLIC_PATH);

// Helper function to safely send files
const sendHtmlFile = (res, filename) => {
    const filePath = path.join(PUBLIC_PATH, filename);
    console.log('Sending file:', filePath);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status || 500).send('Error loading page');
        }
    });
};

// Middleware
app.use(cors());
app.use(compression()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic logging middleware
app.use((req, res, next) => {
    console.log('Request received:', {
        method: req.method,
        url: req.url,
        time: new Date().toISOString()
    });
    next();
});

// Serve static files from the public directory with logging
app.use(express.static(PUBLIC_PATH, {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// Routes
app.get('/', (req, res) => {
    console.log('Root route accessed, redirecting to /main');
    res.redirect('/main');
});

app.get('/main', (req, res) => {
    console.log('Main route accessed');
    sendHtmlFile(res, 'index.html');
});

app.get('/services', (req, res) => {
    console.log('Services route accessed');
    sendHtmlFile(res, 'services.html');
});

// API routes
app.post('/submit-form', async (req, res) => {
    try {
        const { name, phone, description } = req.body;
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: 'طلب خدمة جديد - سمكري محترف',
            text: `
                معلومات الطلب:
                الاسم: ${name}
                رقم الهاتف: ${phone}
                الوصف: ${description}
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'تم إرسال طلبك بنجاح' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'عذراً، حدث خطأ في إرسال الطلب' });
    }
});

// Handle 404
app.use((req, res) => {
    console.log('404 - Not Found:', req.url);
    sendHtmlFile(res, '404.html');
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    sendHtmlFile(res, '500.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
