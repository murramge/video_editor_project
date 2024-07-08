import { ADD_VIDEOPLAYER } from "../actions/VideoActionType";
let VideoState = [];
const VideoPlayer = (state = VideoState, action = {}) => {
  switch (action.type) {
    case ADD_VIDEOPLAYER: {
      return action.payload;
    }
    default:
      return VideoState;
  }
};

export default VideoPlayer;
