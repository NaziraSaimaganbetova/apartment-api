require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 1. ДОБАВИТЬ ЭТО
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(cors()); // 2. ДОБАВИТЬ ЭТО (разрешает запросы от фронтенда)
app.use(express.static('public'));
app.use(express.json());

connectDB();

// Routes
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/resource', require('./routes/apartmentroutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));