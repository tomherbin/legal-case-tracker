const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const casesRouter = require("./routes/caseRoutes"); // Import the cases router
const chatRoutes = require("./routes/chatRoutes"); // Import the cases router

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080", // or the domain from which your front-end will be served
    methods: ["GET", "POST"],
  },
});

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

app.use("/api/cases", casesRouter);

app.use("/api/chat", chatRoutes); // Register the routes

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("data-update", (data) => {
    socket.broadcast.emit("data-update", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.set("io", io);

// Start the server with Socket.IO
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
