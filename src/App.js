import "./App.css";
import { useEffect } from "react";
import VideoMain from "./pages/VideoMain";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VideoEditor from "./pages/VideoEditor";
import { Provider } from "react-redux";
import store from "./store";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

function App() {
  useEffect(() => {
    ffmpeg.load().then(() => {
      console.log("True");
    });
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<VideoMain />}></Route>
            <Route
              path="/edit"
              element={<VideoEditor ffmpeg={ffmpeg} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
