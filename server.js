const express = require('express');
require('dotenv').config();

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}.`);
  });