require("dotenv").config();
const express = require("express");
const cors    = require("cors");

const employeeRoutes = require("./routes/employeeroutes");

const leadRoutes = require("./routes/leadRoutes");
const projectRoutes  = require("./routes/projectRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────
app.use(cors({
  origin: "http://localhost:3000", // Your Next.js / frontend URL
  methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// ── Routes ─────────────────────────────────
app.use("/api/employees", employeeRoutes);

app.use("/api/leads", leadRoutes);
app.use("/api/projects",  projectRoutes);

// ── Health check ───────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Team Management API is running ✅" });
});

// ── Start ──────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});