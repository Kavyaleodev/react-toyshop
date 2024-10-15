import React from "react";

const VideoComponent = () => {
  return (
    <div>
      <video width="800" autoPlay muted loop>
        <source src={`${process.env.PUBLIC_URL}/images/barbie_video.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoComponent;
