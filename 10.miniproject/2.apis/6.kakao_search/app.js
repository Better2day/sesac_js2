require('dotenv').config();
const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const KAKAO_RESTAPI_KEY = process.env.KAKAO_RESTAPI_KEY;

// Middleware
// app.use(express.static('public'));
app.use(morgan('dev'));

// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
    // console.log('/ 접근');
});

app.get('/api/search', async (req, res) => {
    // 카카오로 요청하기
    const { query, type } = req.query;
    console.log(query, type);

    if (!query || !type) {
        return res.status(400).json({ error: '입력 인수 오류' });
    }

    let endpoint;

    if (type === 'web') {
        endpoint = 'https://dapi.kakao.com/v2/search/web';
    } else if (type === 'image') {
        endpoint = 'https://dapi.kakao.com/v2/search/image';
    } else if (type === 'vclip') {
        endpoint = 'https://dapi.kakao.com/v2/search/vclip';
    } else {
        return res.status(400).json({ error: '타입 오류' });
    }

    const params = {
        query,
    }

    const response = await axios.get(endpoint, {
        headers: {
            Authorization: `KakaoAK ${KAKAO_RESTAPI_KEY}`
        },
        params,
    });
    console.log(response.data);
    res.json(response.data);
});

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
