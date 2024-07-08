import { VIDEO_FADE_IN_OUT_VALUE } from "../actions/VideoActionType";
let VideoState = [];
const VideoFade = (state = VideoState, action = {}) => {
  switch (action.type) {
    case VIDEO_FADE_IN_OUT_VALUE: {
      return action.payload;
    }
    default:
      return VideoState;
  }
};

export default VideoFade;
