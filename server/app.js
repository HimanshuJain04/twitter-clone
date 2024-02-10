import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import fileUploader from "express-fileupload";





const app = express();

// middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader(
    {
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }
));




export { app };

