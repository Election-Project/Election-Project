const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const chatRoutes = require("./routes/chatRoutes");
const electoralDistrictRoutes = require("./routes/electoralDistrictRoutes");

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api", userRoutes);

//authenticate
app.use("/auth", authRoutes);

app.use("/api", contactRoutes);

app.use("/api", chatRoutes);

app.use("/api", electoralDistrictRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
