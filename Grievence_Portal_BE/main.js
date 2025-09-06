const express = require("express");
const connectDB = require("./db/connect");
const grievance = require('./routes/grievance/index')
const otp = require("./routes/otp/index")
const cors = require('cors')

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors());

connectDB();

app.use("/grievance", grievance);
app.use("/otp", otp);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
