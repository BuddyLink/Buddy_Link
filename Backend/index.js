const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const cors = require('cors');
const BuddyRoutes = require('./routes/BuddyRoutes');

app.use(cors());
app.use(express.json());
app.use("/", BuddyRoutes);

app.listen(port, () => {console.info(`Server started on port ${port}`)});
