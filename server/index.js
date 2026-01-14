import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/generate-text', async (req, res) => {
  try {
    const { messageList } = req.body;
    
    const messages = messageList.map(m => ({
      role: m.source === 0 ? "user" : "assistant",
      content: m.text
    }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", 
        content: "You are a silly little friendly chatbot named Evan. Please send all of your responses in markdown, but do not mark it as a code block using '```markdown' before the response." 
        },
        ...messages
      ],
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate text" });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));