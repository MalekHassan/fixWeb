# Bathroom Mechanic Service Platform

A professional website for bathroom repair services, built with Node.js and Express.js.

## Features

- Modern, responsive design
- Service showcase
- Contact form with email notifications
- Mobile-friendly interface
- WhatsApp integration

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your email credentials
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `public/` - Static files (HTML, CSS, JS, images)
- `server.js` - Express server configuration
- `.env` - Environment variables (create from .env.example)

## Dependencies

- Express.js - Web framework
- Nodemailer - Email handling
- Body-parser - Request parsing
- Dotenv - Environment variables

## Development

Run the development server with hot reload:
```bash
npm run dev
```

## Production

Start the production server:
```bash
npm start
```