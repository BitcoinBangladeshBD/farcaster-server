import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const FARCASTER_TOKEN = 'wc_secret_808b326b777e96def5305a26d38626fbb045c1b491a69a50466c8f11_b742d835';

app.post('/post', async (req, res) => {
  const { text } = req.body;
  try {
    const response = await fetch('https://api.farcaster.xyz/v2/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FARCASTER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
    const data = await response.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
