const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/authRoutes');
const objectsRoutes = require('./Routes/objsRoutes');
const cookieParser = require('cookie-parser');
const logger = require('./logger');

const app = express();
dotenv.config();
const port = process.env.port || 5000;
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/posts', objectsRoutes);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    app.listen(port, () => logger.info(`app started at port ${port}`));
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
