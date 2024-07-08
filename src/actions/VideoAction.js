import {
  ADD_VIDEOFILE,
  ADD_VIDEOPLAYER,
  VIDEO_SLIDER_VALUE,
  VIDEO_BRIGHT_VALUE,
  VIDEO_FADE_IN_OUT_VALUE,
} from "./VideoActionType";

export const AddVideoFile = (newVideoFile) => {
  return {
    type: ADD_VIDEOFILE,
    payload: newVideoFile,
  };
};

export const ADDVideoPlayer = (newVideoPlayer) => {
  return {
    type: ADD_VIDEOPLAYER,
    payload: newVideoPlayer,
  };
};

export const VideoSliderValue = (newVideoSliderValue) => {
  return {
    type: VIDEO_SLIDER_VALUE,
    payload: newVideoSliderValue,
  };
};

export const VideoBrightValue = (newVideoBrightValue) => {
  return {
    type: VIDEO_BRIGHT_VALUE,
    payload: newVideoBrightValue,
  };
};

export const VideoFadeInOutValue = (newVideoFadeInOutValue) => {
  return {
    type: VIDEO_FADE_IN_OUT_VALUE,
    payload: newVideoFadeInOutValue,
  };
};
