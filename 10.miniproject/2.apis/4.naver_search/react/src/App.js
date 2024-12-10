import { useState } from 'react';
import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResult';

const App = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        setQuery(query);
        setError(null);

        try {
            const response = await fetch(`/search/blog?query=${encodeURIComponent(query)}`)
            const data = await response.json();
            if (data.items) {
                setResult(data.items);
                console.log(result);
            } else {
                setResult([]);
            }
        } catch (err) {
            setError(`요청실패: ${err}`)
        }

        console.log(result);
    }

    return (
        <div>
            <h1>네이버 블로그 검색</h1>
            <SearchBar onSearch={handleSearch} />
            <SearchResult result={result} />
        </div>
    )
}

export default App;