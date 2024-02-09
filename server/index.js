
import { dbConnection } from "./config/dbConnection.js"
import dotenv from "dotenv";
import { app } from "./app.js";

// environment
dotenv.config();

// connection
dbConnection();

// port
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log("Server listening on port : ", PORT)
})


app.get("/", (req, res) => {
    res.send("Twitter Default Route")
});


