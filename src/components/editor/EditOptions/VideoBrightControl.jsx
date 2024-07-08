import { useEffect, useState } from "react";
import { VideoBrightValue } from "../../../actions/VideoAction";
import store from "../../../store";

const VideoBrightControl = () => {
  const [brightness, setBrightness] = useState(0); //밝기
  const [contrast, setContrast] = useState(0); //대비
  const [saturation, setSaturation] = useState(0); //채도

  useEffect(() => {
    const brightvalue = { brightness, contrast, saturation };
    store.dispatch(VideoBrightValue(brightvalue));
  }, [brightness, contrast, saturation]);

  return (
    <div>
      <div>
        <span>brightness : </span>
        <input
          type="range"
          min={0}
          max={3}
          color="gray"
          step={0.1}
          value={brightness}
          onChange={(event) => {
            setBrightness(event.target.valueAsNumber);
          }}
        />
        <span>{brightness}</span>
      </div>
      <div>
        <span>contrast : </span>
        <input
          type="range"
          min={0}
          max={3}
          color="gray"
          step={0.1}
          value={contrast}
          onChange={(event) => {
            setContrast(event.target.valueAsNumber);
          }}
        />
        <span>{contrast}</span>
      </div>
      <div>
        <span>saturation : </span>
        <input
          type="range"
          min={0}
          max={3}
          color="gray"
          step={0.1}
          value={saturation}
          onChange={(event) => {
            setSaturation(event.target.valueAsNumber);
          }}
        />
        <span>{saturation}</span>
      </div>
    </div>
  );
};

export default VideoBrightControl;
