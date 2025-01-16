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

// 사용자 후기를 저장할 배열
let reviews = [];

app.get('/api/review', async (req, res) => {
  res.json({ reviews });
});

app.post('/api/review', async (req, res) => {
  const { rating, comment } = req.body;
  console.log('사용자 입력:', rating, comment);
  const intRating = parseInt(rating);
  // rating = parseInt(rating);

  reviews.push({ intRating, comment });
  res.status(201).json({ message: '등록 완료' });
});

app.get('/api/ai-summary', async (req, res) => {
  if (reviews.length === 0) {
    return res.json({ summary: '리뷰가 없습니다', averageRating: 0 });
  }

  const averageRating = reviews.reduce((total, review) => total + review.intRating, 0) / reviews.length;
  console.log('평균 평점:', averageRating);

  const reviewsText = reviews.map((review) => `평점은 ${review.intRating}이고, 사용자의 후기는 ${review.comment} 입니다`);
  console.log(reviewsText);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: '너는 후기를 분석하는 전문가야. 아래 글을 바탕으로 한글로 간략히 요약해줘.' },
        { role: 'user', content: `다음을 보고 간결하게 요약해주세요: \n\n ${reviews}` }
      ],
      temperature: 0.7
    })

    const summary = response.choices[0].message.content;
    console.log('챗봇 응답: ', summary);

    res.json(summary);
  } catch (error) {
    console.error('오류!!', error.message);
    res.status(500).json({ error: '알 수 없는 오류' });
  }
})


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
})
