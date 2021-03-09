const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/authRoutes');
const objsRoutes = require('./Routes/objsRoutes');
const cmsRoutes = require('./Routes/cmsRoutes');
const cookieParser = require('cookie-parser');
const logger = require('./logger');
const cors = require('cors');

const app = express();
dotenv.config();
const port = process.env.port || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true
}));
app.use('/public', express.static(process.env.FINAL_UPLOAD_DIR));
app.use('/public', express.static(process.env.TEMP_UPLOAD_DIR));
app.use('/api/auth', authRoutes);
app.use('/api/backoffice', objsRoutes);
app.use('/api/cms', cmsRoutes);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      readPreference: 'primary',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      socketTimeoutMS: 90000,
      keepAlive: 10000,
      connectTimeoutMS: 30000
    });
    app.listen(port, () => logger.info(`app started at port ${port}`));
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
