import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { CURRENT_KEY } from "./keys.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/verify-key", (req, res) => {
  const { key } = req.body;
  res.json({ success: key === CURRENT_KEY });
});

app.post("/chat", async (req, res) => {
  const { message, key } = req.body;

  if (key !== CURRENT_KEY) {
    return res.status(403).json({ reply: "مفتاح غير صالح" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch {
    res.json({ reply: "خطأ في السيرفر" });
  }
});

app.listen(3000, () => console.log("Server running"));