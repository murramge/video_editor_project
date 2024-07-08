import { VIDEO_SLIDER_VALUE } from "../actions/VideoActionType";
let VideoState = [];
const VideoSliderValue = (state = VideoState, action = {}) => {
  switch (action.type) {
    case VIDEO_SLIDER_VALUE: {
      return action.payload;
    }
    default:
      return VideoState;
  }
};

export default VideoSliderValue;
