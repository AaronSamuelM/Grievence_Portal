const express = require("express");
const connectDB = require("./db/connect");
const grievance = require('./routes/grievance/index')
const auth = require("./routes/auth/index")
const adminAuth = require("./routes/auth/adminauth");
const cors = require('cors')

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors());

connectDB();

app.use("/grievance", grievance);
app.use("/auth/user", auth);
app.use("/api/auth/admin", adminAuth);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
