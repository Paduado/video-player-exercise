import React from "react";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ src }) => {
  return (
    <div className={styles.container}>
      <video className={styles.video} src={src} controls />
      <div className={styles.controlsContainer}>
        {/* <PlayButton play={true} onClick={null} /> */}
        {/* <ProgressBar value={0} onChange={null} /> */}
      </div>
    </div>
  );
};

export default VideoPlayer;
