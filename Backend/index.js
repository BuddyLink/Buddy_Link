const express = require("express");
const cors = require("cors");
const AuthRoutes = require("./routes/Auth");
const session = require("express-session");
require("dotenv").config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
const PORT = 3000;
const CLIENT_PORT = 5173;
const CLIENT_URL = `http://localhost:${CLIENT_PORT}`;

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "buddy_link_session",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 },
  })
);

app.use(AuthRoutes);
app.listen(PORT, () => {
  console.info(`Server started on port ${PORT}`);
});
