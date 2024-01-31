const express = require("express");
const dotenv = require("dotenv").config();
const errorHandle = require("./middleware/errorHandle");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use('/api/getContact',require('./routes/contactRouter'));
app.use('/api/users',require('./routes/contactUser'));
app.use(errorHandle);
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})