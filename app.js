// configure dotenv
require('dotenv').config({ path: './config/.env' });

const express = require('express');
const app = express();
// const cors = require('cors');


// require userRoutes
const userRoutes = require('./routes/userRoutes');

// connect database
require('./config/database').connectdatabase();

// config express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());


app.use('/api/v1/user', userRoutes);

app.listen(process.env.PORT, console.log('Listening on port 3000'));
