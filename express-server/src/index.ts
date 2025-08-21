import express from "express";
import { createClient } from "redis";

const redisClient = createClient();
const app =  express();

app.use(express.json());


app.post("/submit", async (req, res) => {
    try {
        const {problemId, userId, code, language} = req.body;
    
        await redisClient.lPush("submission", JSON.stringify({problemId, userId, code, language}));
    
        res.json({
            message: "Submission received and stored."
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to store submission.",
            error
        })
    }
})



const startServer = async () => {
    try {
        await redisClient.connect();
        console.log("Connected to redis!")
        
        app.listen(3000, ()=>{
            console.log("Server is running on port 3000")
        })
    } catch (error) {
        console.log("Failed to start server", error)
    }
}

startServer();