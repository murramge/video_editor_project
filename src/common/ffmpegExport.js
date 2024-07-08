import { readFileAsBase64 } from "../utils/utils";
import { fetchFile } from "@ffmpeg/ffmpeg";
export const VideoFileOutffmpegExport = async ({
  ffmpeg,
  minTime,
  maxTime,
  setptsvalue,
  videoFile,
  videoAddAudio,
  outputFilename,
  outputTypename,
  value,
  brightValue,
  fadeValue,
}) => {
  const contrast = brightValue.contrast;
  const brightness = brightValue.brightness;
  const saturation = brightValue.saturation;
  const fadeInDuration = fadeValue.fadeInDuration;
  const fadeOutDuration = fadeValue.fadeOutDuration;

  if (value == "video") {
    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));
    await ffmpeg.run(
      "-ss",
      `${minTime}`,
      "-i",
      "input.mp4",
      "-vf",
      `setpts=(1/${setptsvalue})*PTS${
        contrast || brightness || saturation
          ? `,eq=contrast=${contrast}:brightness=${brightness}:saturation=${saturation}`
          : ""
      }

      ${
        fadeInDuration || fadeOutDuration
          ? `,fade=t=in:st=${minTime}:d=${fadeInDuration},fade=t=out:st=${
              maxTime / setptsvalue - fadeOutDuration
            }:d=${fadeOutDuration}`
          : ""
      }`,
      "-t",
      `${maxTime / setptsvalue}`,
      "-c:a",
      "copy",
      "output.mp4"
    );
  } else if (value == "audio") {
    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));
    ffmpeg.FS("writeFile", "audio.mp3", await fetchFile(videoAddAudio));
    await ffmpeg.run(
      "-i",
      "input.mp4",
      "-i",
      "audio.mp3",
      "-c:v",
      "copy",
      "-map",
      "0:v",
      "-map",
      "1:a",
      "-shortest",
      "-y",
      "output.mp4"
    );
  } else if (value == "gif") {
    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));
    await ffmpeg.run(
      "-i",
      "input.mp4",
      "-ss",
      `${minTime}`,
      "-to",
      `${maxTime}`,
      "-f",
      "gif",
      "output.gif"
    );
  }

  const data = ffmpeg.FS("readFile", outputFilename);
  const dataURL = await readFileAsBase64(
    new Blob([data.buffer], { type: outputTypename })
  );

  const link = document.createElement("a");
  link.href = dataURL;
  link.setAttribute("download", "");
  link.click();
};
