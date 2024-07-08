import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { sliderValueToVideoTime } from "../../utils/utils";
import { VideoFileOutffmpegExport } from "../../common/ffmpegExport";
import ExportButton from "../../common/ExportButton";

const VideoExport = ({ ffmpeg }) => {
  let videoplayer = useSelector((state) => state.videoplayer);
  let videofile = useSelector((state) => state.videofile);
  let slidervalue = useSelector((state) => state.slidervalue);
  let brightvalue = useSelector((state) => state.videobright);
  let fadevalue = useSelector((state) => state.videofade);
  const AudioFileUpload = useRef("");
  const [videoPlayer, setvideoPlayer] = useState();
  const [videoFile, setvideoFile] = useState();
  const [sliderValue, setsliderValue] = useState();
  const [brightValue, setbrightValue] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
  });
  const [fadeValue, setfadeValue] = useState({
    fadeInDuration: 0,
    fadeOutDuration: 0,
  });
  useEffect(() => {
    if (fadevalue.length !== 0) {
      setfadeValue(fadevalue);
    }
  }, [fadevalue]);

  useEffect(() => {
    if (brightvalue.length !== 0) {
      setbrightValue(brightvalue);
    }
  }, [brightvalue]);

  useEffect(() => {
    if (slidervalue.length !== 0) {
      setsliderValue(slidervalue);
    }
  }, [slidervalue]);

  useEffect(() => {
    setvideoFile(videofile);
  }, []);

  useEffect(() => {
    if (videoplayer.currentSrc) {
      setvideoPlayer({ ...videoplayer });
    }
  }, [videoplayer]);

  const convertToGif = async () => {
    const [min, max] = sliderValue;
    const minTime = sliderValueToVideoTime(videoPlayer.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayer.duration, max);

    await VideoFileOutffmpegExport({
      ffmpeg,
      minTime,
      maxTime,
      videoFile,
      outputFilename: "output.gif",
      outputTypename: "image/gif",
      value: "gif",
    });
  };

  const onCutTheVideo = async () => {
    const [min, max] = sliderValue;
    const minTime = sliderValueToVideoTime(videoPlayer.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayer.duration, max);
    const setptsvalue = videoPlayer.playbackRate;

    await VideoFileOutffmpegExport({
      ffmpeg,
      minTime,
      maxTime,
      setptsvalue,
      videoFile,
      outputFilename: "output.mp4",
      outputTypename: "video/mp4",
      value: "video",
      brightValue,
      fadeValue,
    });
  };

  const audioToVideo = async (videoAddAudio) => {
    if (videoAddAudio) {
      await VideoFileOutffmpegExport({
        ffmpeg,
        videoFile,
        videoAddAudio,
        outputFilename: "output.mp4",
        outputTypename: "video/mp4",
        value: "audio",
      });
    } else {
      alert("오디오를 추가해주세요 :)");
    }
  };

  return (
    <>
      <div>
        <ExportButton onClick={convertToGif}>gif download</ExportButton>
        <ExportButton onClick={onCutTheVideo}>video download</ExportButton>
        <ExportButton onClick={() => AudioFileUpload.current.click()}>
          audio download
        </ExportButton>
      </div>
      <input
        ref={AudioFileUpload}
        type="file"
        accept=".mp3"
        style={{ display: "none" }}
        onChange={(e) => audioToVideo(e.target.files[0])}
      />
    </>
  );
};
export default VideoExport;
