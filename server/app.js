import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

export { app };
