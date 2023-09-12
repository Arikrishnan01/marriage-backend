const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes.js');


const app = express();

// INJECT THE DOTENV AND CORS
    dotenv.config();
    app.use(cors());

// ACCEPT THE JSON DATA 
    app.use(express.json());

// MONGODB CONNECT
    connectDB();

    const PORT = process.env.PORT || 5000

// API ENDPOINT HOME PAGE
    app.get('/', (req, res) => {
        res.send("API RUNNING SUCCESSFULLY");
    });

// ROUTES USE
app.use("/api/user", userRoutes);

// SERVER LISTING WITH PORT NUMBER
    app.listen(PORT, (req, res) => {
        console.log(`SERVER STARTED : ${PORT}`.yellow.bold);
    });