const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { sequelize } = require("./models");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const candidateRoutes = require("./routes/candidateRouter");
const partyList = require("./routes/partyListRouter");
const chatRoutes = require("./routes/chatRoutes");
const electoralDistrictRoutes = require("./routes/electoralDistrictRoutes");
const advertisementRoutes = require("./routes/advertisementRoutes");
const localList = require("./routes/localListRouter");
const paymentRoutes = require("./routes/paymentRoutes");
const partyListCandidate = require("./routes/partyListCandidateRoutes");
const districtRoutes = require("./routes/districtRoutes");
const adminRouter = require("./routes/adminRouter");
const electionRoutes = require("./routes/electionRouter");
const chatSocketRoutes = require("./routes/chatSocketRoutes");

const app = express();
const server = http.createServer(app);

// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your client URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Initialize Socket.IO
const io = new Server(server, {
  cors: corsOptions,
});

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api/local-list", localList);
app.use("/api/candidate", candidateRoutes);
app.use("/api/election", electionRoutes);
app.use("/api/party-list", partyList);
app.use("/api/party-list-candidate", partyListCandidate);
app.use("/api", districtRoutes);
app.use("/api", paymentRoutes);
app.use("/auth", authRoutes);
app.use("/api", contactRoutes);
app.use("/api", chatRoutes);
app.use("/api", electoralDistrictRoutes);
app.use("/api", advertisementRoutes);
app.use("/api", adminRouter);
app.use("/chat", chatSocketRoutes);

// Socket.IO Setup
io.on("connection", (socket) => {
  console.log("A user connected");

  // Extract token from query parameters
  const token = socket.handshake.query.token;
  let national_id;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    national_id = decoded.national_id;
    socket.userId = national_id;
  } catch (error) {
    console.error("Error verifying token:", error);
    socket.disconnect();
    return;
  }

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chatMessage", async (data) => {
    try {
      const { message, is_admin } = data;

      // Fetch the user's name based on their national_id
      const user = await sequelize.models.User.findOne({
        where: { national_id: socket.userId },
        attributes: ["national_id", "full_name", "email"],
      });

      if (!user) {
        console.error("User not found");
        return;
      }

      // Save the message to the database
      const chatMessage = await sequelize.models.ChatMessage.create({
        user_id: is_admin ? null : socket.userId,
        admin_id: is_admin ? socket.userId : null,
        message,
        is_admin,
      });

      // Broadcast the message to all connected clients
      io.emit("chatMessage", {
        message: chatMessage.message,
        user_name: chatMessage.user_name,
        is_admin: chatMessage.is_admin,
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
