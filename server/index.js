
import { dbConnection } from "./config/dbConnection.js"
import dotenv from "dotenv";
import { app } from "./app.js";
import { cloudinaryConnection } from "./config/cloudinary.config.js"
import { createServer } from "http";
import { Server } from "socket.io";
import {
    handleUserConnected,
    handleSendMessage,
} from "./controllers/webrtc.controller.js"


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


io.on('connection', (socket) => {

    // Handle user connection
    socket.on('userConnected', async (userId) => {
        await handleUserConnected(userId, socket.id);
    });

    socket.on('send-message', async (messageData) => {
        await handleSendMessage(socket, messageData);
    });

    // Handle offer message
    socket.on('offer', (offer, recipientSocketId) => {
        io.to(recipientSocketId).emit('offer', offer, socket.id);
    });

    // Handle answer message
    socket.on('answer', (answer, recipientSocketId) => {
        io.to(recipientSocketId).emit('answer', answer);
    });

    // Handle ICE candidate message
    socket.on('icecandidate', (candidate, recipientSocketId) => {
        io.to(recipientSocketId).emit('icecandidate', candidate);
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
        // Handle specific errors (e.g., disconnection) or emit an error event to the client
    });

});



server.listen(PORT, () => {
    console.log("Server listening on port : ", PORT)
});


app.get("/api/v1/", (req, res) => {
    res.send("Twitter Default Route")
});


