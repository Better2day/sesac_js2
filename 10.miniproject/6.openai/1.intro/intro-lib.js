const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

if (!openai.apiKey) {
  console.error('키 오류!!');
  process.exit(1);
}

async function getChatGPTResponse(userInput) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: '너는 정신과 의사야. 다양한 사람들의 심리 상담을 해주고 있어' },
        { role: 'user', content: userInput }
      ],
      temperature: 0.7
    })

    return response.choices[0].message.content;
  } catch (error) {
    console.error('오류!!', error.message);
  }
}

async function chatWithUser() {
  const userInput = '사후세계가 존재할까? 나는 불가지론자야. 존재하는지 그렇지 않은지 알 수 없을 것 같아';
  const aiResponse = await getChatGPTResponse(userInput);
  console.log('챗봇 응답:', aiResponse);
}

chatWithUser();
