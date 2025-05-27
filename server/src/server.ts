import { createServer } from "http";
import mongoose from "mongoose";
import app from "./config/app.config";
import { DotenvConfig } from "./config/env.config";
import Print from "./utils/print";

function listen() {
    const PORT = DotenvConfig.PORT;
    const httpServer = createServer(app);
    httpServer.listen(PORT); 
    Print.info(`🚀 Server is listening on port ${PORT}`);
}

mongoose
    .connect(DotenvConfig.DATABASE_HOST as string, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s
    })
    .then(() => {
        listen();
        Print.info("Connected to mongoDB");
    })
    .catch(() => {
        Print.error("Couldn't connect to database");
    });


