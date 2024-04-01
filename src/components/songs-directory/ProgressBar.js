import React, { useState } from "react";
import "./progressBar.css";

export default function ProgressBar({
  currentSongAudio,
  currentTime,
  setCurrentTimeValue,
}) {
  const progressBarStyle = {
    width: currentSongAudio
      ? `${(currentTime / currentSongAudio.duration) * 100}%`
      : "0%",
  };

  const [timer, setTimer] = useState(null);

  const handleSeek = (e) => {
    let value = e.target.value;
    clearTimeout(timer); // Clear previous timer
    setTimer(setCurrentTimeValue(value));
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const newValue = (touch.clientX / e.target.offsetWidth) * e.target.max;
    setCurrentTimeValue(newValue);
    clearTimeout(timer);
    setTimer(setCurrentTimeValue(newValue));
  };

  const handleTouchEnd = (e) => {
    const touch = e.touches[0];
    const newValue = (touch.clientX / e.target.offsetWidth) * e.target.max;
    setCurrentTimeValue(newValue);
    clearTimeout(timer);
    setTimer(setCurrentTimeValue(newValue));
  };

  return (
    <div
      className="range-input-container"
      onChange={handleSeek}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchEnd}
    >
      <input
        className="range-input"
        type="range"
        min="0"
        max={
          currentSongAudio && currentSongAudio.duration
            ? currentSongAudio.duration
            : "0"
        }
        value={currentTime}
      />
      <div className="range-progress" style={progressBarStyle}></div>
    </div>
  );
}
