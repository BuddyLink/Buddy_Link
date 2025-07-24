import express, { json, urlencoded } from "express";
import cors from "cors";
import AuthRoutes from "./routes/Auth.js";
import session from "express-session";

const app = express();
app.use(json({ limit: "10mb" }));
app.use(urlencoded({ limit: "10mb", extended: true }));
const PORT = 3000;
const CLIENT_PORT = 5173;
const CLIENT_URL = `http://localhost:${CLIENT_PORT}`;

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

app.use(
  session({
    secret: "buddy_link_session",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 },
  }),
);

app.use(AuthRoutes);
app.listen(PORT, () => {
  console.info(`Server started on port ${PORT}`);
});
