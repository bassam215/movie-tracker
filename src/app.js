const express = require('express');
const cors = require('cors');

const httpStatusText = require('./utils/httpStatusText');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');

app.use('/api/auth', authRoutes);






app.get('/', (req, res) => {
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: 'Welcome to Movie Tracker API',
  });
});


app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    status: err.statusText || httpStatusText.ERROR,
    message: err.message,
  });
});


app.all("/{*splat}", (req, res) => {
    res.status(404).json({ status: httpStatusText.FAIL, message: "Not found" });
});


module.exports = app;