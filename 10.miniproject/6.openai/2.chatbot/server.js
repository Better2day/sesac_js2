const express = require('express');
const morgan = require('morgan');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

if (!openai.apiKey) {
  console.error('키 오류!!');
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

app.post('/api/chat', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: '사용자가 뭐라고 물어보든지 너는 무조건 요리와 관련된 답변을 해야 돼' },
        { role: 'user', content: question }
      ],
      temperature: 0.7
    })

    const answer = response.choices[0].message.content;
    console.log('챗봇 응답: ', answer);

    res.json(answer);
  } catch (error) {
    console.error('오류!!', error.message);
    res.status(500).json({ error: '알 수 없는 오류' });
  }
})

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
})
