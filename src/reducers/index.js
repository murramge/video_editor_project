import { combineReducers } from "redux";
import VideoFile from "./VideoFileReducer";
import VideoPlayer from "./VideoPlayerReducer";
import VideoSliderValue from "./VideoSliderValue";
import VideoBright from "./VideoBrightReducer";
import VideoFade from "./VideoFadeReducer";

const rootReducer = combineReducers({
  videofile: VideoFile,
  videoplayer: VideoPlayer,
  slidervalue: VideoSliderValue,
  videobright: VideoBright,
  videofade: VideoFade,
});

export default rootReducer;
