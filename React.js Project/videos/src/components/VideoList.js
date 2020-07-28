import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({videos, onVideoSelect}) => {
    const renderList = videos.map((video) => {
        return <VideoItem onVideoSelect={onVideoSelect} key={video.id.videoId} video={video}/>;
    })
    return(
        <div className="ui relaxed divided list">{renderList}</div>
    );
};

export default VideoList;