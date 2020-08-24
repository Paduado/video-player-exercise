import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./ProgressBar.module.css";

export default function ProgressBar({ value = 0, onChange }) {
  const trackRef = useRef();
  const [pressed, setPressed] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { x, width } = trackRef.current.getBoundingClientRect();
      const value = (e.clientX - x) / width;
      onChange(round(clamp(value)));
    },
    [onChange]
  );

  useEffect(() => {
    if (!pressed) {
      return;
    }

    function handleMouseUp() {
      setPressed(false);
    }

    function handleMouseMove(e) {
      handleChange(e);
    }

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [pressed, handleChange]);

  function handleTrackMouseDown(e) {
    handleChange(e);
    setPressed(true);
  }

  return (
    <div className={styles.container}>
      <div
        ref={trackRef}
        className={styles.bar}
        onMouseDown={handleTrackMouseDown}
      >
        <div
          className={styles.fill}
          style={{
            transform: `scaleX(${value})`
          }}
        ></div>
        <div
          className={styles.thumb}
          style={{
            left: `${value * 100}%`
          }}
        ></div>
      </div>
    </div>
  );
}

function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

function round(value) {
  return Math.round(value * 100) / 100;
}
