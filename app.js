require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');

const port = process.env.PORT

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(port, ()=>{
  console.log(`server running on port ${port}`);
});