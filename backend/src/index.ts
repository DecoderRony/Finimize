import express from "express";
import cors from "cors";
import connectDB from "./config/db-connection";
import baseRouter from "./routes/base-route";

const frontendOrigin = process.env.FRONTEND_ORIGIN;
const app = express();
const port = process.env.PORT ?? 3000;
// connect to mongodb
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const corsPolicy = cors({
  origin: frontendOrigin, // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
app.use(corsPolicy);
app.use(express.json());
app.use("/api", baseRouter);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
