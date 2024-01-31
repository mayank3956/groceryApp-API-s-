const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const bodyParser = require('body-parser');
const userRouter = require("./routers/userRoute")
const adminRouter = require("./routers/adminRoute")
const { signUp, login } = require("./controllers/authController")
const { isUser, verifyToken, isAdmin} = require("./helper")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(bodyParser.json());
app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/grocery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/user",[verifyToken, isUser], userRouter )
app.use("/admin",[verifyToken, isAdmin], adminRouter )

// Signup endpoint
app.post('/signup', signUp)
// Login endpoint
app.post('/login', login)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
