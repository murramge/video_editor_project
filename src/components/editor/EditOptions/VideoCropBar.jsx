import { useState, useRef, useCallback, useEffect } from "react";
import classnames from "classnames";
import store from "../../../store";
import { useSelector } from "react-redux";
import "./VideoCropBar.css";
import { sliderValueToVideoTime, toTimeString } from "../../../utils/utils";
import { VideoSliderValue } from "../../../actions/VideoAction";

const VideoCrop = ({ playerRef, min = 0, max = 100 }) => {
  const [sliderValues, setSliderValues] = useState([0, 100]);

  let videoplayer = useSelector((state) => state.videoplayer);

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const [timevalue, setTimeValue] = useState();
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const timeSlider = (minValue) => {
    if (minValue && videoplayer && playerRef) {
      playerRef.current.seek(
        sliderValueToVideoTime(videoplayer.duration, minValue)
      );
    }
  };

  useEffect(() => {
    if (videoplayer && playerRef) {
      const [min, max] = sliderValues;
      let minTime = sliderValueToVideoTime(videoplayer.duration, min);
      let maxTime = sliderValueToVideoTime(videoplayer.duration, max);
      if (!isNaN(minTime) && !isNaN(maxTime)) {
        setTimeValue([minTime, maxTime]);
        if (videoplayer.currentTime < parseInt(minTime)) {
          playerRef.current.seek(parseInt(minTime));
        }
        if (videoplayer.currentTime > parseInt(maxTime)) {
          playerRef.current.seek(parseInt(minTime));
        }
      }
    }
    store.dispatch(VideoSliderValue(sliderValues));
  }, [videoplayer]);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    setSliderValues([minVal, maxVal]);
    timeSlider(minVal);
  }, [minVal, maxVal]);

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={classnames("thumb thumb--zindex-3", {
          "thumb--zindex-5": minVal > max - 100,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb--zindex-4"
      />
      <div className="slider">
        <img
          src={process.env.PUBLIC_URL + `image/scissor.png`}
          width={23}></img>
        <div className="slider__track"></div>
        <div ref={range} className="slider__range"></div>
      </div>
      {timevalue ? (
        <div className="crop_time">
          <div>{toTimeString(timevalue[0])}</div>
          <div>{toTimeString(timevalue[1])}</div>
        </div>
      ) : (
        <div>loding</div>
      )}
    </div>
  );
};

export default VideoCrop;
