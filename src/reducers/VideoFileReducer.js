import { ADD_VIDEOFILE } from "../actions/VideoActionType";
let VideoState = [];
const VideoFile = (state = VideoState, action = {}) => {
  switch (action.type) {
    case ADD_VIDEOFILE: {
      return action.payload;
    }
    default:
      return VideoState;
  }
};

export default VideoFile;
