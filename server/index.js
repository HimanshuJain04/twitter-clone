
import { dbConnection } from "./config/dbConnection.js"
import dotenv from "dotenv";
import { app } from "./app.js";


// import routes 
import authRoute from "./routes/auth.route.js";

// environment
dotenv.config();

// connection
dbConnection();

// port
const PORT = process.env.PORT || 5000;


app.use("/api/v1/auth", authRoute);


app.listen(PORT, () => {
    console.log("Server listening on port : ", PORT)
})


app.get("/api/v1/", (req, res) => {
    res.send("Twitter Default Route")
});


