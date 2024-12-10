require('dotenv').config();
const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.YOUTUBE_API_KEY;

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

// 사용자 정의 필터 추가
env.addFilter('stringify', function (obj) {
    return JSON.stringify(obj);
});
env.addFilter('decodeHtmlEntities', decodeHtmlEntities);

app.set('view engine', 'html');

// Middleware setup
app.use(morgan('dev'));


// Routing
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/search', async (req, res) => {
    // const query = decodeURIComponent(req.query.q);
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('입력 인자 없음');
    }

    console.log('Search Keyword:', query);
    // const data = fetchYoutube(q);
    // 여기에서 실제로 youtube에 검색해서 결과를 반환한다.

    const url = 'https://www.googleapis.com/youtube/v3/search';
    const params = {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10,
        key: API_KEY,
    };

    // Axios로 요청한다. 결과 목록을 json으로 예쁘게 처리한다.
    try {
        const response = await axios.get(url, { params });
        // 전부 보내서 FE에서 알아서 처리하게 함
        // const videos = response.data.items;
        // 필요한 데이터만 선택 전송
        const videos = response.data.items.map(item => ({
            videoId: item.id.videoId, // Video ID
            title: decodeHtmlEntities(item.snippet.title), // 영상 제목
            description: item.snippet.description, // 영상 설명
            thumbnailUrl: item.snippet.thumbnails.default.url, // Thumbnail URL (small size)
        }));
        console.log(videos);
        res.render('index', { videos });
    } catch (error) {
        console.log('요청 오류', error);
        return res.status(500).send('알 수 없는 서버 오류');
    }
    // res.render('index', (검색결과 넘겨주기));
});

function decodeHtmlEntities(text) {
    const entities = {
        '&#39;': "'", // single quote
        '&quot;': '"', // double quote
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
    };
    return text.replace(/&#39;|&quot;|&amp;|&lt;|&gt;/g, match => entities[match] || match);
    text.replace()
}

app.get('/play', (req, res) => {
    const videoId = req.query.videoId;
    const videos = JSON.parse(decodeURIComponent(req.query.videos || '[]'));

    const selectedVideos = videos.find((video => video.videoId === videoId));

    res.render('index', { videos, selectedVideos });
});

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
