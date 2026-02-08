require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
connectDB();

app.use(express.json());
// Routes
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/resource', require('./routes/apartmentroutes')); // Matches "Resource" requirements

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));