const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app =express();
app.use(cors(
  {origin:'https://financial-analytics-frontend.onrender.com',
  credentials:true}
));
app.use(express.json());

// connect database
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongoDB connected"))
.catch(err=>console.log(err));

// routes
app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/transactions',require('./routes/transactionRoutes'));
const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
