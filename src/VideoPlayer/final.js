import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";
import styles from "./VideoPlayer.module.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import PlayButton from "../PlayButton";
import { isVideoPlaying } from "./VideoPlayer.utils";

const VideoPlayer = forwardRef(({ src }, ref) => {
  const videoRef = useRef();
  const [play, setPlay] = useState(false);
  const [progress, setProgress] = useState(0);

  useImperativeHandle(
    ref,
    () => {
      const video = videoRef.current;
      return {
        play() {
          video.play();
        },
        pause() {
          video.pause();
        },
        seekTo(progress) {
          video.currentTime = progress * video.duration;
        }
      };
    },
    []
  );

  function handlePlayButtonClick() {
    const video = videoRef.current;
    if (isVideoPlaying(video)) {
      video.pause();
    } else {
      video.play();
    }
  }

  function handleProgressChange(progress) {
    const video = videoRef.current;
    video.currentTime = video.duration * progress;
  }

  function handleVideoPlay() {
    setPlay(true);
  }

  function handleVideoPause() {
    setPlay(false);
  }

  function handleVideoTimeupdate() {
    const video = videoRef.current;
    setProgress(video.currentTime / video.duration);
  }

  return (
    <div className={styles.container}>
      <video
        ref={videoRef}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onTimeUpdate={handleVideoTimeupdate}
        className={styles.video}
        src={src}
      />
      <div className={styles.controlsContainer}>
        <PlayButton play={play} onClick={handlePlayButtonClick} />
        <ProgressBar value={progress} onChange={handleProgressChange} />
      </div>
    </div>
  );
});

export default VideoPlayer;
