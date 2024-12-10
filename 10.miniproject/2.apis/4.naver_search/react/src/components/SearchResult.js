const SearchResult = ({ result }) => {
    return (
        <ul>
            {result.map((item, index) => (
                <li key={index}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <h3>{item.title}</h3>
                    </a>
                    <p>{item.description}</p>
                    <p>{item.postdate}</p>
                </li>
            ))}
        </ul>
    )
};

export default SearchResult;