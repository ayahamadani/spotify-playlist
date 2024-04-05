import React, { useState, useEffect } from "react";
import "./progressBar.css";

export default function ProgressBar({
  currentSongAudio,
  currentTime,
  setCurrentTimeValue,
  showFullBar,
}) {
  const progressBarStyle = {
    width: currentSongAudio
      ? `${(currentTime / currentSongAudio.duration) * 100}%`
      : "0%",
    display: showFullBar ? "none" : "block",
  };

  const [timer, setTimer] = useState(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const width = 450;
      if (window.innerWidth <= width) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobile]);

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
        className={showFullBar ? "range-input" : "expanded-range-input"}
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
