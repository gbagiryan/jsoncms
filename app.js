const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/authRoutes');
const objectsRoutes = require('./Routes/objectsRoutes');
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
const port = process.env.port || 5000;
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/posts', objectsRoutes);

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(port, () => console.log(`app started at port ${port}`))
    } catch (error) {
        console.log(error)
    }
})();