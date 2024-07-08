import React from "react";
import { AddVideoFile } from "../../actions/VideoAction.js";
import { useNavigate } from "react-router-dom";
import store from "../../store/index.js";
import "./VideoUpload.css";

const VideoUpload = () => {
  const navigate = useNavigate();

  const FileSaveAndPageMove = (file) => {
    store.dispatch(AddVideoFile(file));
    navigate("/edit");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    FileSaveAndPageMove(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <label
      className={"preview"}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <input
        type="file"
        className="file"
        accept="video/*"
        onChange={(e) => FileSaveAndPageMove(e.target.files[0])}
      />
      <p className="preview_msg">
        비디오를 이곳에 드롭하거나, 화면을 클릭하세요...
      </p>
      <p className="preview_desc">파일당 최대 3MB</p>
    </label>
  );
};
export default VideoUpload;
