const VideoList = ({ videos }) => {
    return (
        <ul>
            {videos.map((video) => (
                <li key={video.id.videoId}>
                    <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                    <div>
                        <h3>{video.snippet.title}</h3>
                        <p>{video.snippet.description}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default VideoList;
