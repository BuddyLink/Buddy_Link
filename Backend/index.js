const express = require("express");
const cors = require("cors");
// const BuddyRoutes = require('./routes/BuddyRoutes');
const AuthRoutes = require("./routes/Auth");
const session = require("express-session");

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5178",
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
// app.use("/", BuddyRoutes);

app.listen(PORT, () => {
  console.info(`Server started on port ${PORT}`);
});
