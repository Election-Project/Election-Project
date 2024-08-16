const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const candidateRoutes = require("./routes/candidateRouter");
const electionRoutes = require("./routes/electionRouter");
const partyList = require("./routes/partyListRouter");
const chatRoutes = require("./routes/chatRoutes");
const electoralDistrictRoutes = require("./routes/electoralDistrictRoutes");
const advertisementRoutes = require("./routes/advertisementRoutes");

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/local-list", localList);
app.use("/api/candidate", candidateRoutes);
app.use("/api/election", electionRoutes);
app.use("/api/party-list", partyList);

//authenticate
app.use("/auth", authRoutes);

app.use("/api", contactRoutes);

app.use("/api", chatRoutes);

app.get("/api/election-results", async (req, res) => {
  try {
    const localLists = await LocalList.findAll({
      include: [
        { model: ElectoralDistrict },
        { model: Candidate, include: [User] },
      ],
    });

    const partyLists = await PartyList.findAll({
      include: [{ model: PartyListCandidate, include: [User] }],
    });

    const totalVoters = await User.count({ where: { hasVoted: true } });

    const muslimSeats = 15;

    res.json({
      localLists,
      partyLists,
      totalVoters,
      muslimSeats,
    });
  } catch (error) {
    console.error("Error fetching election results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.use("/api", electoralDistrictRoutes);

app.use("/api", advertisementRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
