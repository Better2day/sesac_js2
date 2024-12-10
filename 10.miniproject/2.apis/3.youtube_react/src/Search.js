import { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const fetchData = async (e) => {
        e.preventDefault();

        if (e.target.value) {
            setKeyword(e.target.value)
            console.log(keyword);
        }

        const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
        const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
        const params = {
            part: 'snippet',
            q: keyword,
            maxResults: 10,
            key: API_KEY,
        };

        const data = await axios.get(BASE_URL, params);
    }

    return (
        <form onSubmit={fetchData}>
            <input type="text" id="search" name="search" placeholder="검색어를 입력하세요" />
            <button>검색</button>
        </form>
    )
};

export default Search;
