# Flavor Heaven Restaurant Website

A dynamic, mobile-responsive restaurant website with e-commerce functionality for food ordering and table reservations.

## Features

- **Home Page**: Hero section with auto-playing slideshow, animated CTAs, and dynamic grid layout
- **Menu Page**: Categorized menu items with images, descriptions, and ordering functionality
- **Shopping Cart & Checkout**: Persistent cart with order customization and secure payment processing
- **About Page**: Restaurant history, chef profiles, and photo gallery
- **Contact Page**: Location information, reservation system, and feedback form
- **Mobile-Responsive Design**: Optimized for all device sizes
- **E-commerce Functionality**: Online ordering with customization options
- **Reservation System**: Table booking with availability checking

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Tailwind CSS

- **Backend**: Express.js
- **Database**: MongoDB
- **Payment Processing**: Stripe API
- **Maps Integration**: Google Maps API

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `public/`: Static assets (HTML, CSS, JavaScript, images)
- `src/`: Server-side code
  - `routes/`: API route definitions
  - `controllers/`: Request handlers
  - `models/`: Database models
  - `views/`: Server-rendered views (if applicable)

## License

MIT 