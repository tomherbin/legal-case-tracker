const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const casesRouter = require("./routes/caseRoutes"); // Import the cases router

const app = express();
app.use(
  cors({
    origin: "http://localhost:8080", // or the domain from which your front-end will be served
  })
);

// Replace with your MongoDB connection string
const mongoConnectionString = "mongodb://localhost:27017/legal-case-tracker";

// Connect to MongoDB
mongoose
  .connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json()); // Middleware to parse JSON bodies

// Use the cases router for any requests to the '/api/cases' endpoint
app.use("/api/cases", casesRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
