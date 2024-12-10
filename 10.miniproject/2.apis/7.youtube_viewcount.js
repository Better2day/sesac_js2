const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
    console.error('YOUTUBE_API_KEY는 필수 입력 사항입니다!');
    process.exit(1);
};

const searchUrlAPI = 'https://www.googleapis.com/youtube/v3/search';
const videoUrlAPI = 'https://www.googleapis.com/youtube/v3/videos';

const maxResultPerPage = 10;
const totalPages = 5;

const searchResult = [];
let filteredResult = [];

const fetchYoutube = async () => {
    let nextPageToken = null;

    try {
        for (let page = 1; page <= totalPages; page++) {
            const params = {
                part: 'snippet',
                q: '자바스크립트 개발',
                type: 'video',
                maxResults: maxResultPerPage,
                pageToken: nextPageToken,
                key: API_KEY,
            }

            const response = await axios.get(searchUrlAPI, { params });
            const data = response.data;

            // console.log('data.items = ', data.items);
            searchResult.push(...data.items);

            // 다음 페이지의 ID
            nextPageToken = data.nextPageToken;
            console.log('다음 페이지: ', nextPageToken);
        }

        // const videoInfo = data.items.forEach(item => {
        // searchResult.forEach(async (item) => {
        for (let index = 0; index < searchResult.length; index++) {
            item = searchResult[index];
            // console.log('각각의 비디오 클립 조회: ', item);
            const title = item.snippet.title; // 영상 제목
            const videoId = item.id?.videoId // Video clip ID
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // 우리가 만든 URL
            const description = item.snippet.description; // 영상 설명

            // 각각의 비디오 클립에 대해서 추가 정보를 조회
            const videoParams = {
                part: 'statistics',
                id: videoId,
                key: API_KEY,
            }

            const videoResponse = await axios.get(videoUrlAPI, { params: videoParams });
            // console.log('구분선 1 ---------------------------------------------------');
            // console.log(videoResponse.data);
            // console.log(videoResponse.data.items);
            /* 
                console.log({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    viewCount: videoResponse.data.items[0].statistics?.viewCount,
                    'Video URL': `https://www.youtube.com/watch?v=${item.id.videoId}`,
                });
             */
            filteredResult.push({
                index: index + 1,
                id: item.id.videoId,
                title: item.snippet.title,
                viewCount: videoResponse.data.items[0].statistics?.viewCount,
                'Video URL': `https://www.youtube.com/watch?v=${item.id.videoId}`
            });

            /*
            data.items.forEach(item => {
                const title = item.snippet.title; // 영상 제목
                const videoId = item.id.videoId // Video clip ID
                const videoUrlAPI = `https://www.youtube.com/watch?v=${videoId}`; // 우리가 만든 URL
                const description = item.snippet.description; // 영상 설명
                
                console.log(`영상 제목: ${title}`);
                console.log(`URL 주소: ${videoUrlAPI}`);
                console.log(`설명: ${description}`);
                console.log('-'.repeat(40));
                })
                // console.log(data.items[0].snippet);
                */
        }
        // console.log('filteredResult: ', filteredResult);
        // console.log('구분선 2 ---------------------------------------------------');

        console.table(filteredResult, ['index', 'title', 'viewCount', 'Video URL']);
    } catch (error) {
        console.error('요청 실패: ', error.message);
        // console.trace('요청 실패');
    }
};

fetchYoutube();
