const axios = require('axios');
require('dotenv').config();

const username = 'Better2day';
// const username = 'theresnosuchuser3487264871';
// const url = `https://api.github.com/users/${username}`;
const url = `https://api.github.com/users/${username}/repos`;
const token = process.env.GITHUB_TOKEN;

/* 
axios.get(url)
    .then(response => {
        console.log('내 repo 정보: ', response.data);
    })
 */

const fetchGithub = async () => {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `token ${token}`, // 인증 헤더 추가
            },
        });

        if (response.status === 200) {
            // console.log('내 repo 정보: ', response.data);
            // 내 repo 목록만 출력하기
            // console.log(response.data);

            const repos = response.data;
            // console.log(repos[0]);

            repos.forEach(repo => {
                console.log(`repo name: ${repo.name}, 스타 수: ${repo.stargazers_count}}`);
            })

            // 스타가 많은 리포 순으로 정렬. 그 후 top 5만 뽑아내기
            const topStarredRepo = repos
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 5);

            console.log('=== 스타 수가 많은 리포 Top 5 ===');
            topStarredRepo.forEach(repo => {
                console.log(`repo name: ${repo.name}, 스타 수: ${repo.stargazers_count}}`);
            });

            // 최근에 업데이트가 이루어진 리포는?
            // 최근 한 달 이내 업데이트가 이루어진 리포를 출력하시오.
            let oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            // console.log(oneMonthAgo);
            const recenntlyUpdatedRepo = repos.filter(repo => {
                const updatedAt = new Date(repo.updated_at);
                return updatedAt >= oneMonthAgo;
            });

            console.log('=== 최근 한 달 이내 업데이트된 리포 ===');
            recenntlyUpdatedRepo.forEach(repo => {
                // UTC → 한국 시간으로 변경
                const koreanTime = new Date(repo.updated_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
                console.log(`repo name: ${repo.name}, 업데이트 일시: ${koreanTime}}`);
            });
        } else {
            console.log('오류: ', response.status);
        }
    } catch (error) {
        console.log('에러 발생: ', error.message);
    }
};

fetchGithub();
