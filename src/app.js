import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import osintRoutes from "./routes/osintRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20
});

app.use(limiter);
app.use(osintRoutes);

export default app;
