import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "You are a professional AI receptionist. Help users book appointments."
      },
      { role: "user", content: userMessage }
    ],
  });

  res.json({
    reply: response.choices[0].message.content
  });
});

app.get("/", (req, res) => {
  res.send("Backend Live ✅");
});

app.listen(3000);
