const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
    console.error('YOUTUBE_API_KEY는 필수 입력 사항입니다!');
    process.exit(1);
};

const searchUrlAPI = 'https://www.googleapis.com/youtube/v3/search';
const videoUrlAPI = 'https://www.googleapis.com/youtube/v3/videos';

const maxResultPerPage = 5;
const totalPages = 7;

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

        const table = [];
        // const videoInfo = data.items.forEach(item => {
        // searchResult.forEach(async (item) => {
        for (let index = 0; index < searchResult.length; index++) {
            item = searchResult[index];
            // console.log('각각의 비디오 클립 조회: ', item);
            let title = item.snippet.title; // 영상 제목
            const videoId = item.id?.videoId // Video clip ID
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // 우리가 만든 URL
            const description = item.snippet.description; // 영상 설명

            // 각각의 비디오 클립에 대해서 추가 정보를 조회
            const videoParams = {
                part: 'statistics',
                id: videoId,
                key: API_KEY,
            }

            // 타이틀이 너무 길면 자르기
            const maxTitleLength = 30;
            if (title.length > maxTitleLength) {
                title = title.slice(0, maxTitleLength) + "...";
            };

            const videoResponse = await axios.get(videoUrlAPI, { params: videoParams });
            const videoData = videoResponse.data;
            const viewCount = videoData.items[0].statistics?.viewCount || 'N/A';
            // console.log(videoData.items?.[0]?.statistics.viewCount);
            table.push({ Index: index + 1, Title: title, 'ViewCount': viewCount, 'VideoURL': videoUrl });

            // console.log('구분선 1 ---------------------------------------------------');
            // console.log(videoResponse.data);
            // console.log(videoResponse.data.items);

            /* 
            filteredResult.push({
                index: index + 1,
                id: item.id.videoId,
                title: item.snippet.title,
                viewCount: videoResponse.data.items[0].statistics?.viewCount,
                'Video URL': `https://www.youtube.com/watch?v=${item.id.videoId}`
            });
 */
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

        // Table 형태로 출력
        console.table(table);
        // console.table(filteredResult, ['index', 'title', 'viewCount', 'Video URL']);
    } catch (error) {
        console.error('요청 실패: ', error.message);
        // console.trace('요청 실패');
    }
};

// fetchYoutube();

const fetchYoutube_parallel = async () => {
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

        }

        // Promise.all을 통해서 전체를 병행 처리
        const table = await Promise.all( // 이거 안에서 처리한 게 모두 끝나면 종료
            searchResult.map(async (item, index) => {
                let title = item.snippet.title; // 영상 제목
                const videoId = item.id?.videoId // Video clip ID
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // 우리가 만든 URL
                const description = item.snippet.description; // 영상 설명

                // 각각의 비디오 클립에 대해서 추가 정보를 조회
                const videoParams = {
                    part: 'statistics',
                    id: videoId,
                    key: API_KEY,
                }

                // 타이틀이 너무 길면 자르기
                const maxTitleLength = 30;
                if (title.length > maxTitleLength) {
                    title = title.slice(0, maxTitleLength) + "...";
                };

                const videoResponse = await axios.get(videoUrlAPI, { params: videoParams });
                const videoData = videoResponse.data;
                const viewCount = videoData.items[0].statistics?.viewCount || 'N/A';
                // console.log(videoData.items?.[0]?.statistics.viewCount);
                return { Index: index + 1, Title: title, 'ViewCount': viewCount, 'VideoURL': videoUrl };
            }));
        // const promises = searchResult.map(({ videoUrl, videoParams, }));
        console.table(table);

    } catch (error) {
        console.error('요청 실패: ', error);
        // console.error('요청 실패: ', error.message);
        // console.trace('요청 실패');
    }
}


// console.time, timeEnd 안에 인수로 주는 label은 같아야 한다. (다르면 오류 발생)
console.time("parallel 실행 시간 측정");
(async () => {
    await fetchYoutube_parallel();
    console.timeEnd("parallel 실행 시간 측정");
})();

console.time("실행 시간 측정");
(async () => {
    await fetchYoutube();
    console.timeEnd("실행 시간 측정");
})();
