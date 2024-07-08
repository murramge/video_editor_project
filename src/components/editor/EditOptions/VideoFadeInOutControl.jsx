import { useEffect, useState } from "react";
import { VideoFadeInOutValue } from "../../../actions/VideoAction";
import store from "../../../store";

const VideoFadeInOutControl = () => {
  const [fadeInDuration, setFadeInDuration] = useState(0);
  const [fadeOutDuration, setfadeOutDuration] = useState(0);
  useEffect(() => {
    const fadeinoutvalue = { fadeInDuration, fadeOutDuration };
    store.dispatch(VideoFadeInOutValue(fadeinoutvalue));
  }, [fadeInDuration, fadeOutDuration]);

  return (
    <div>
      <div>
        <span>fadeIn : </span>
        <input
          type="range"
          min={0}
          max={15}
          color="gray"
          step={0.1}
          value={fadeInDuration}
          onChange={(event) => {
            setFadeInDuration(event.target.valueAsNumber);
          }}
        />
        <span>{fadeInDuration}</span>
      </div>
      <div>
        <span>fadeOut : </span>
        <input
          type="range"
          min={0}
          max={15}
          color="gray"
          step={0.1}
          value={fadeOutDuration}
          onChange={(event) => {
            setfadeOutDuration(event.target.valueAsNumber);
          }}
        />
        <span>{fadeOutDuration}</span>
      </div>
    </div>
  );
};

export default VideoFadeInOutControl;
