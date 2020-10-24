require('./models/User');
require('./models/Track');
const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require('./middlewares/requireAuth');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongo connected");
});

mongoose.connection.on("error", (error) => {
  console.error("Mongo connection error: ", error);
});

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(trackRoutes);

app.get("/", requireAuth, (req, res) => {
  res.send(req.user);
});

app.listen(3000, () => {
  console.log("Server is started on port 3000");
});
