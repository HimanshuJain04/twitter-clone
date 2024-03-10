
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
const io = new Server(server, { cors: true });

// Initialize users object to store user information
const users = {};

// Handle WebSocket connections
io.on('connection', socket => {
    console.log('New client connected:', socket.id);

    // Store user information when they connect
    socket.on('userConnected', userId => {
        console.log(`User connected: ${userId}`);
        users[userId] = socket.id;
    });

    // Handle call request
    socket.on('call', (recipientUserId) => {
        const recipientSocketId = users[recipientUserId];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('callRequest', socket.id);
        } else {
            console.log(`Recipient user ${recipientUserId} not found.`);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        // Remove user information when they disconnect
        Object.keys(users).forEach(userId => {
            if (users[userId] === socket.id) {
                delete users[userId];
            }
        });
    });

    // Handle signaling messages (if needed)
    // Implement signaling message handling as before
    socket.on('offer', (offer, to) => {
        io.to(to).emit('offer', offer, socket.id);
    });

    socket.on('answer', (answer, to) => {
        io.to(to).emit('answer', answer);
    });

    socket.on('icecandidate', (candidate, to) => {
        io.to(to).emit('icecandidate', candidate);
    });
});




server.listen(PORT, () => {
    console.log("Server listening on port : ", PORT)
});


app.get("/api/v1/", (req, res) => {
    res.send("Twitter Default Route")
});


