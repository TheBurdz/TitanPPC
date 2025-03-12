const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors()); // Allow Chrome Extension to communicate

// OpenAI API Key (Store securely, never expose in frontend)
const OPENAI_API_KEY = "your-openai-api-key"; 

// API Route to process PPC data
app.post('/analyze-ppc', async (req, res) => {
    try {
        const ppcData = req.body;  // Receive data from the Chrome Extension

        const openAIResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4-turbo",  // Use your Custom GPT Model
                messages: [
                    { role: "system", content: "You are an expert Amazon PPC strategist." },
                    { role: "user", content: `Analyze this PPC campaign data and provide insights: ${JSON.stringify(ppcData)}` }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ insights: openAIResponse.data.choices[0].message.content });
    } catch (error) {
        console.error("Error in AI Processing:", error);
        res.status(500).json({ error: "AI processing failed." });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
