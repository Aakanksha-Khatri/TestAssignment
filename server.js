const express = require('express');
const { connectDB } = require('./config/db');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');

require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/discussions', discussionRoutes);

const PORT = process.env.PORT || 5001
;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
