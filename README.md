# Apartment Rental & Selling API

## Project Overview
This is a RESTful API for managing apartment listings (renting and selling) built with Node.js, Express, and MongoDB.

## Setup Instructions
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with `MONGO_URI` and `JWT_SECRET`
4. Run `npm start` or `npm run dev`

## API Documentation
### Auth Routes
- POST `/api/auth/register` - Public
- POST `/api/auth/login` - Public

### Apartment Routes
- GET `/api/resource` - Private (Get all my apartments)
- POST `/api/resource` - Private (Create new apartment)
- PUT `/api/resource/:id` - Private (Update)
- DELETE `/api/resource/:id` - Private (Delete)