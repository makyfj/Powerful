import express, { Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { userRoutes } from "./routes/userRoutes";
import { workoutRoutes } from "./routes/workoutRoutes";
import { exerciseRoutes } from "./routes/exerciseRoutes";
import { setRoutes } from "./routes/setRoutes";

// Environment variables
dotenv.config();

const app = express();

// Secure HTTP headers
app.use(helmet());

// Cors
app.use(cors());

// Cookie parser
app.use(cookieParser());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Powerful API is running!!");
});

// User Routes
app.use("/api/user", userRoutes);

// Workout Routes
app.use("/api/workout", workoutRoutes);

// Exercise Routes
app.use("/api/exercise", exerciseRoutes);

// Set Routes
app.use("/api/set", setRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
