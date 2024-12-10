import { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';

const YoutubeApp = () => {
    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState('');

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${BASE_URL}`, {
                params: {
                    part: 'snippet',
                    q: query,
                    maxResults: 10,
                    key: API_KEY,
                }
            });
            setVideos(response.data.items);
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <div>
            <h1>Youtube 검색 기능</h1>
            <SearchBar query={query} onInputChange={setQuery} onSearch={handleSearch} />
            <VideoList videos={videos} />
        </div>
    )
}

export default YoutubeApp;
