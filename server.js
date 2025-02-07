const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: '*' }));

const API_KEY = "AIzaSyDOk7gML8Bv8athGvOCEvXiUqhyfEer4CM"; // Move to environment variables
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

app.post("/fetch-recommendations", async (req, res) => {
    try {
        const { age, gender, bmi } = req.body;

        if (!age || !gender || !bmi) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Updated request format for Gemini API
        const requestBody = {
            contents: [{
                parts: [{
                    text: `Suggest a healthy diet for a ${age}-year-old ${gender} with a BMI of ${bmi}.`
                }]
            }]
        };

        const response = await axios.post(GEMINI_API_URL, requestBody, {
            headers: { 
                "Content-Type": "application/json"
            }
        });

        // Extract the text from Gemini's response
        const recommendation = response.data.candidates[0].content.parts[0].text;
        
        res.json({ recommendation });
    } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        res.status(500).json({ 
            error: "Failed to fetch recommendations", 
            details: error.response?.data || error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});