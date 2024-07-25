const express = require('express');
const mongoose = require('mongoose');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const app = express();
userRouter = require('./routes/userRouter');
const cors = require('cors');
require("dotenv").config();
// !Connect to mongodb
mongoose
    .connect("mongodb://localhost:27017/Expensetracker")
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));
//! cors configuration
const corsOptions = {
    origin: ["http://localhost:5173"]
}
//!Middlewares
app.use(cors(corsOptions))
app.use(express.json());//Pass incoming json data

// !Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//!Error Handler
app.use(errorHandlerMiddleware)
// !Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on thie ${PORT}`))