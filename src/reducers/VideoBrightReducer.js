import { VIDEO_BRIGHT_VALUE } from "../actions/VideoActionType";
let VideoState = [];
const VideoBright = (state = VideoState, action = {}) => {
  switch (action.type) {
    case VIDEO_BRIGHT_VALUE: {
      return action.payload;
    }
    default:
      return VideoState;
  }
};

export default VideoBright;
