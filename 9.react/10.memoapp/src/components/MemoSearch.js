const MemoSearch = ({ search }) => {
    const handleSearch = (e) => {
        search(e.target.value);    // 입력값이 변경될 때마다 바로바로 부모에게 해당 값 전달
    }

    return (
        <input 
            type="text"
            placeholder="검색어를 입력하세요"
            className="search-bar"
            onChange={ handleSearch }
        />
    );
}

export default MemoSearch;
