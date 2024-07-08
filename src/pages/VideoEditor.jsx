import VideoPlayer from "../components/editor/VideoPlayer.jsx";
import { useRef, useEffect } from "react";
import VideoCropBar from "../components/editor/EditOptions/VideoCropBar.jsx";
import VideoExport from "../components/editor/VideoExport.jsx";
import VideoBrightControl from "../components/editor/EditOptions/VideoBrightControl.jsx";
import VideoFadeInOutControl from "../components/editor/EditOptions/VideoFadeInOutControl.jsx";

const VideoEditor = ({ ffmpeg }) => {
  const playerRef = useRef();
  return (
    <div className="VideoEditor">
      <VideoPlayer playerRef={playerRef} />
      <VideoCropBar playerRef={playerRef}></VideoCropBar>
      <p className="edit-options-header">Edit Options ... </p>
      <div className="edit-options-wrap">
        <VideoBrightControl />
        <VideoFadeInOutControl />
      </div>
      <VideoExport ffmpeg={ffmpeg}></VideoExport>
    </div>
  );
};
export default VideoEditor;
