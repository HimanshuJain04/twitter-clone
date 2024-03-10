
import { dbConnection } from "./config/dbConnection.js"
import dotenv from "dotenv";
import { app } from "./app.js";
import { cloudinaryConnection } from "./config/cloudinary.config.js"
import { createServer } from "http";
import { Server } from "socket.io";


// import routes 
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";

// environment
dotenv.config();

// connection
dbConnection();

// cloudinary
cloudinaryConnection();

// port
const PORT = process.env.PORT || 5000;


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/user", userRoute);


const server = createServer(app);
const io = new Server(server);


// Handle WebSocket connections
io.on('connection', socket => {
    console.log('New client connected:', socket);

    // Handle signaling messages
    socket.on('offer', (offer, to) => {
        io.to(to).emit('offer', offer, socket.id);
    });

    socket.on('answer', (answer, to) => {
        io.to(to).emit('answer', answer);
    });

    socket.on('icecandidate', (candidate, to) => {
        io.to(to).emit('icecandidate', candidate);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log("Server listening on port : ", PORT)
});


app.get("/api/v1/", (req, res) => {
    res.send("Twitter Default Route")
});


