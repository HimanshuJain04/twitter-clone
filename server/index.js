import express from "express"
import { dbConnection } from "./config/dbConnection.js"
import dotenv from "dotenv";

const app = express();
dotenv.config();

dbConnection();

