import {
  BigPlayButton,
  ControlBar,
  LoadingSpinner,
  Player,
  PlaybackRateMenuButton,
} from "video-react";
import "video-react/dist/video-react.css";
import { useEffect, useState, useRef } from "react";
import store from "../../store/index";

import { useNavigate } from "react-router-dom";
import { ADDVideoPlayer } from "../../actions/VideoAction";

const VideoPlayer = ({ playerRef, startTime }) => {
  const [source, setSource] = useState();
  const [videoPlayerState, setVideoPlayerState] = useState();
  const Button = useRef();
  const navigate = useNavigate();
  let videofile = store.getState().videofile;

  useEffect(() => {
    if (videofile.length == 0) {
      navigate("/");
    } else {
      setSource(URL.createObjectURL(videofile));
    }
  }, []);

  useEffect(() => {
    if (videoPlayerState) {
      store.dispatch(ADDVideoPlayer(videoPlayerState));
    }
  }, [videoPlayerState]);

  const handlePlayerState = (player) => {
    if (player) {
      if (playerRef.current !== player) {
        playerRef.current = player;
        player.subscribeToStateChange(setVideoPlayerState);
      }
    }
  };

  return (
    <div className={"video-player"}>
      <div className="video-player-header">
        <p>Video Editor</p>
        <button
          onClick={() => {
            navigate("/");
          }}>
          X
        </button>
      </div>
      <Player
        ref={(player) => {
          handlePlayerState(player);
        }}
        src={source}
        startTime={startTime}>
        <source src={source} />
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar>
          <PlaybackRateMenuButton ref={Button} rates={[5, 2, 1, 0.5, 0.1]} />
        </ControlBar>
      </Player>
    </div>
  );
};

VideoPlayer.defaultProps = {
  startTime: undefined,
};

export default VideoPlayer;
