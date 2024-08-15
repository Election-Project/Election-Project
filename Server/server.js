const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const localList = require("./routes/localListRouter");
const contactRoutes = require("./routes/contact");
const candidateRoutes = require("./routes/candidateRouter");
// Configure CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow only your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(cors());

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/local-list", localList);
app.use("/api/candidate", candidateRoutes);

//authenticate
app.use("/auth", authRoutes);

app.use("/api", contactRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
