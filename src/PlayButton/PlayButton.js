import React from "react";
import { ReactComponent as Play } from "../icons/play.svg";
import { ReactComponent as Pause } from "../icons/pause.svg";
import styles from "./PlayButton.module.css";

export default function PlayButton({ play, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {play ? <Pause /> : <Play />}
    </button>
  );
}
