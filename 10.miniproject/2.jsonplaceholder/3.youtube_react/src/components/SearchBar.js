const SearchBar = ({ query, onInputChange, onSearch }) => {
    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => onInputChange(e.target.value)}
            />
            <button onClick={onSearch}>
                검색
            </button>
        </div>
    );
};

export default SearchBar;
