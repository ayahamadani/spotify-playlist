import React, { useEffect, useState } from "react";
import SongsData from "./songs/SongsData";
import explicitIcon from "./songs/images/explicity-icon.png";
import ProgressBar from "./ProgressBar";
import Header from "../header-directory/Header";
import Play from "../play-directory/Play";
import "./songs.css";
import "./mobileSong.css";

export default function Songs() {
  const [currentSongAudio, setCurrentSongAudio] = useState(null);
  const [currentSongData, setCurrentSongData] = useState({});
  const [songs, setSongs] = useState(SongsData);
  const [currentTime, setCurrentTime] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [volume, setVolume] = useState(1);
  const [lastVolume, setLastVolume] = useState(1);
  const [mobile, setMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);

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

  const handleTouch = (id) => {
    if (mobile) {
      if (isPlaying(id)) {
      } else playSong(id);
    }
  };

  const toggleVolume = () => {
    if (volume > 0) {
      setLastVolume(volume);
      setVolume(0);
      currentSongAudio.volume = 0;
    } else {
      setVolume(lastVolume);
      currentSongAudio.volume = lastVolume;
    }
  };

  const changeVolume = (e) => {
    let value = e.target.value;
    setVolume(value);
    currentSongAudio.volume = value;
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSongData]);

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      playSong(currentSongData.id);
    }
  };

  useEffect(() => {
    var songList = [];
    SongsData.forEach((song) => {
      songList.push({
        ...song,
        liked: false,
        isHovered: false,
        isPlaying: false,
      });
    });
    setSongs(songList);
    setCurrentSongData({ ...songList[0] });
    const newAudio = new Audio(songList[0].filePath);
    setCurrentSongAudio(newAudio);
  }, []);

  const hoverIn = (songIndex) => {
    let songList = [...songs];
    songList[songIndex].isHovered = true;
    setSongs(songList);
  };

  const hoverOut = (songIndex) => {
    let songList = [...songs];
    songList[songIndex].isHovered = false;
    setSongs(songList);
  };

  const likeSong = (songIndex) => {
    let songList = [...songs];
    songList[songIndex].liked = !songList[songIndex].liked;
    setSongs(songList);
  };

  // Getting the song based on songID
  const getSongById = (songId) => {
    return songs.find((song) => song.id === songId);
  };

  // Function to show the playing gif
  const isPlaying = (songId) => {
    if (!currentSongData) return false;
    return songId === currentSongData.id && currentSongData.isPlaying;
  };

  const playSong = (songId) => {
    let song = getSongById(songId);
    // If a song playing isnt the same one we want to play
    if (currentSongData && currentSongData.id !== songId) {
      currentSongAudio.pause();
      setCurrentSongData({ ...song, isPlaying: true });
      const newAudio = new Audio(song.filePath);
      setCurrentSongAudio(newAudio);
      newAudio.play();
      return;
    }

    // Pausing the song
    if (
      currentSongData &&
      currentSongData.id === songId &&
      currentSongData.isPlaying
    ) {
      currentSongAudio.pause();
      setCurrentSongData({ ...currentSongData, isPlaying: false });
      return;
    }

    // Resuming the song
    if (
      currentSongData &&
      currentSongData.id === songId &&
      !currentSongData.isPlaying
    ) {
      setCurrentSongData({ ...currentSongData, isPlaying: true });
      currentSongAudio.play();
      return;
    }

    // Playing a new song
    const newAudio = new Audio(song.filePath);
    setCurrentSongAudio(newAudio);
    setCurrentSongData({ ...song, isPlaying: true });
    newAudio.play();
  };

  // Function which returns the song index by a given id
  const getSongIndex = (songId) => {
    for (let i = 0; i < songs.length; i++) {
      if (songs[i].id === songId) return i;
    }
  };

  const skipSong = (songId, pause = true) => {
    let skippedSong = getSongById(songId);
    let nextSongIndex = (getSongIndex(songId) + 1) % songs.length;
    if (currentSongData) {
      currentSongAudio.pause();
      setCurrentSongData({ ...skippedSong, isPlaying: false });
      const newAudio = new Audio(songs[nextSongIndex].filePath);
      setCurrentSongAudio(newAudio);
      setCurrentSongData({ ...songs[nextSongIndex], isPlaying: pause });
      if (pause) {
        newAudio.play();
      }
    }
  };

  const prevSong = (songId) => {
    let skippedSong = getSongById(songId);
    let song = getSongById(songId - 1);
    if (currentTime > 2) {
      if (isPlaying(songId)) {
        currentSongAudio.pause();
        setCurrentSongData({ ...skippedSong, isPlaying: false });
        const newAudio = new Audio(skippedSong.filePath);
        setCurrentSongAudio(newAudio);
        setCurrentSongData({ ...skippedSong, isPlaying: true });
        newAudio.play();
      } else {
        const newAudio = new Audio(skippedSong.filePath);
        setCurrentSongAudio(newAudio);
      }
    } else if (currentSongData && skippedSong.id !== 1) {
      currentSongAudio.pause();
      setCurrentSongData({ ...skippedSong, isPlaying: false });
      const newAudio = new Audio(song.filePath);
      setCurrentSongAudio(newAudio);
      setCurrentSongData({ ...song, isPlaying: true });
      newAudio.play();
    }
  };

  useEffect(() => {
    const handleSongEnd = () => {
      if (getSongIndex(currentSongData.id) === SongsData.length - 1) {
        skipSong(currentSongData.id, false);
      } else skipSong(currentSongData.id);
    };

    // Add event listener for the 'ended' event on the current audio element
    if (currentSongAudio) {
      if (currentSongAudio) {
        currentSongAudio.volume = volume;
      }
      currentSongAudio.addEventListener("ended", handleSongEnd);
    }

    // Cleanup the event listener when the component unmounts or when currentSongAudio changes
    return () => {
      if (currentSongAudio) {
        currentSongAudio.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [currentSongAudio, currentSongData, songs]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentSongAudio && !currentSongAudio.paused) {
        setCurrentTime(currentSongAudio.currentTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentSongAudio]);

  useEffect(() => {
    if (currentSongAudio) {
      const intervalId = setInterval(() => {
        setCurrentTime(currentSongAudio.currentTime);

        const remainingTime =
          currentSongAudio.duration - currentSongAudio.currentTime;
        const remainingMinutesValue = Math.floor(remainingTime / 60);
        const remainingSecondsValue = Math.floor(remainingTime % 60);

        setRemainingMinutes(remainingMinutesValue);
        setRemainingSeconds(remainingSecondsValue);

        if (remainingTime <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [
    currentSongAudio,
    setCurrentTime,
    setRemainingMinutes,
    setRemainingSeconds,
  ]);

  const setCurrentTimeValue = (time) => {
    if (!currentSongAudio.isPlaying) {
      currentSongAudio.currentTime = time;
      setCurrentTime(time);
    } else {
      currentSongAudio.currentTime = time;
      setCurrentTime(time);
      currentSongAudio.play();
    }
  };

  if (!expanded) {
    return (
      <div className="songs-main-container gotham">
        <Header />
        <Play />
        <div className="w100 pl4 songs-main">
          <div className="songs-header pb1 B3B3B3">
            <div className="tag">#</div>
            <div>
              <div style={{ textAlign: "start" }} className="title">
                Title
              </div>
            </div>
            <div className="album-name">Album</div>
            <div className="date-added">Date Added</div>
            <div className="duration-divs">
              <i className="fa-regular fa-clock"></i>
            </div>
          </div>
          <div className="hr"></div>
          {songs.map((song, index) => (
            <div
              key={index}
              onMouseEnter={() => hoverIn(index)}
              onMouseLeave={() => hoverOut(index)}
              onClick={() => handleTouch(song.id)}
              className={
                song.isHovered ? "song B3B3B3 h4 hover-color" : "song B3B3B3 h4"
              }
            >
              <div
                className="mt1 h2 song-index"
                onClick={() => playSong(song.id)}
              >
                {song.isHovered && isPlaying(song.id) ? (
                  <i className="fa-solid fa-pause white" />
                ) : isPlaying(song.id) ? (
                  <div className="music-wave">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                  </div>
                ) : song.isHovered ? (
                  <i className="fa-solid fa-play white" />
                ) : (
                  song.id
                )}
              </div>

              <div className="flex align-center">
                <div className="flex justify-start">
                  <img
                    src={song.albumCover}
                    className="album-cover"
                    alt="album-cover"
                  />
                </div>
                <div>
                  <div className="white pl1 song-title-divs">{song.title}</div>
                  <div
                    className={
                      song.isHovered
                        ? "flex pl1 p2 fss white"
                        : "flex pl1 p2 grey fss"
                    }
                  >
                    <div className="flex align-center">
                      {song.explicit ? (
                        <img
                          src={explicitIcon}
                          alt="explicit-icon"
                          className="explicit-icon"
                        />
                      ) : null}
                    </div>
                    <div className="artist-name-divs">{song.artist}</div>
                  </div>
                </div>
              </div>

              <div
                className={song.isHovered ? "white album-names" : "album-names"}
              >
                {song.album}
              </div>
              <div
                className={song.isHovered ? "white date-added" : "date-added"}
              >
                {song.dateAdded}
              </div>

              <div onClick={() => likeSong(index)} className="duration-divs">
                {song?.liked ? (
                  <div className="flex justify-center w2">
                    <i className="fa-solid fa-heart green hover" />
                  </div>
                ) : song?.isHovered && !song?.favorited ? (
                  <div className="flex justify-center w2">
                    <i className="fa-regular fa-heart hover" />
                  </div>
                ) : (
                  `${parseInt(song.duration / 60)}:${Math.floor(
                    song.duration % 60
                  )}`
                )}
              </div>
              <div className="ellipsis-div">
                <i className="fa-solid fa-ellipsis" />
              </div>
            </div>
          ))}
        </div>
        <div className="current-song-main">
          {/* Right Div */}
          <div className="flex pl1">
            <div className="current-album-cover-container">
              {currentSongData !== null ? (
                <img
                  src={currentSongData.albumCover}
                  alt={currentSongData.title}
                  className="current-album-cover"
                />
              ) : (
                <span>meow</span>
              )}
            </div>
            <div className="flex flex-column justify-center pl1">
              <div className="font-size085">
                {currentSongData !== null ? currentSongData.title : "mewo"}
              </div>
              <div className="artist grey">
                {currentSongData !== null ? currentSongData.artist : "mewo"}
              </div>
            </div>
          </div>

          <div className="flex flex-column pt75">
            <div className="flex justify-center">
              <div className="p1">
                <i className="fa-solid fa-shuffle player-btn hover" />
              </div>
              <div className="p1" onClick={() => prevSong(currentSongData.id)}>
                <i className="fa-solid fa-backward-step player-btn hover" />
              </div>
              <div className="flex center current-play-btn-container">
                <div
                  className="circle bgwhite black play-btn hover"
                  onClick={() => playSong(currentSongData.id)}
                >
                  {currentSongData.isPlaying ? (
                    <i className="fa-solid fa-pause play-pause-btns" />
                  ) : (
                    <i className="fa-solid fa-play play-pause-btns" />
                  )}
                </div>
              </div>
              <div className="p1" onClick={() => skipSong(currentSongData.id)}>
                <i className="fa-solid fa-forward-step player-btn hover" />
              </div>
              <div className="p1">
                <i className="fa-solid fa-repeat player-btn hover" />
              </div>
            </div>
            <div className="playing-container">
              <div className="grey font-size085 circularLight flex align-self-end">
                {currentSongAudio ? parseInt(currentTime / 60) : "--:--"}:
                {currentSongAudio
                  ? parseInt(currentTime % 60) < 9
                    ? "0" + Math.ceil(currentTime % 60)
                    : Math.ceil(currentTime % 60)
                  : null}
              </div>
              <div className="song-progress-div">
                <ProgressBar
                  currentSongAudio={currentSongAudio}
                  currentTime={currentTime}
                  showFullBar={expanded || !mobile}
                  setCurrentTimeValue={setCurrentTimeValue}
                />
              </div>
              <div className="grey font-size085 circularLight pl1">
                {"-"}
                {currentSongAudio ? remainingMinutes : null}:
                {/* remaining seconds */}
                {currentSongAudio
                  ? remainingSeconds < 10
                    ? "0" + remainingSeconds
                    : remainingSeconds
                  : "--:--"}
              </div>
            </div>
          </div>
          <div className="flex justify-end align-center mr2">
            <div>
              <i className="fa-solid fa-bars player-btn hover" />
            </div>
            <div className="ml1">
              {volume > 0 && volume < 0.6 ? (
                <i
                  className="fa-solid fa-volume-low player-btn hover"
                  onClick={() => toggleVolume()}
                />
              ) : volume >= 0.6 ? (
                <i
                  className="fa-solid fa-volume-high player-btn hover"
                  onClick={() => toggleVolume()}
                />
              ) : (
                <i
                  className="fa-solid fa-volume-off player-btn hover"
                  onClick={() => toggleVolume()}
                />
              )}
            </div>
            <div className="mr1">
              <input
                type="range"
                className="range-input flex align-self-center ml1 w100"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={changeVolume}
              />
            </div>
            <div className="ml1">
              <i className="fa-solid fa-up-right-and-down-left-from-center player-btn hover" />
            </div>
          </div>
        </div>
        {/* mobile current song */}
        {/* <Link to="/mobile-song">Mobile Song</Link> */}
        <div
          id="mobile-current-song-main"
          style={{ background: "#" + currentSongData.hexColor }}
          onClick={() => setExpanded(true)}
        >
          <div className="flex justify-between">
            <div className="flex">
              <div className="current-album-cover-container">
                {currentSongData !== null ? (
                  <img
                    src={currentSongData.albumCover}
                    alt={currentSongData.title}
                    className="current-album-cover"
                  />
                ) : (
                  <span>meow</span>
                )}
              </div>
              <div id="song-title-artist-mobile">
                <div className="flex-row-one flex">
                  <div className="animation-one">
                    <span className="white current-song-title-mobile">
                      {currentSongData !== null
                        ? currentSongData.title
                        : "mewo"}
                    </span>
                    <span className="white"> &#8226;</span>
                    <span className="E6DBDB current-song-artist-mobile">
                      {currentSongData !== null
                        ? currentSongData.artist
                        : "mewo"}
                    </span>
                  </div>
                </div>

                <div className="flex ml05">
                  <i className="fa-solid fa-volume-low green current-fa-volume" />
                  <div className="green ml05 phone">PHONE</div>
                </div>
              </div>
            </div>
            <div className="play-btn-mobile">
              <div className="green mobile">
                <i className="fa-solid fa-mobile-screen-button" />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  playSong(currentSongData.id);
                }}
              >
                {currentSongData.isPlaying ? (
                  <i className="fa-solid fa-pause play-pause-btns" />
                ) : (
                  <i className="fa-solid fa-play play-pause-btns" />
                )}
              </div>
            </div>
          </div>
          <div className="song-progress-div-mobile">
            <ProgressBar
              currentSongAudio={currentSongAudio}
              currentTime={currentTime}
              setCurrentTimeValue={setCurrentTimeValue}
              showFullBar={expanded}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="mobile-songs"
        style={{ background: "#" + currentSongData.hexColor }}
      >
        <div className="white circular expanded-row-one">
          <i
            className="fa-solid fa-angle-down"
            onClick={() => setExpanded(false)}
          />
          <h3>Yes, i play the same 5 songs on repeat for hours.</h3>
          <p>...</p>
        </div>
        <div className="flex justify-center expanded-image">
          <img
            src={currentSongData.albumCover}
            alt={currentSongData.title}
            className="br10"
          />
        </div>
        <div className="expanded-bottom-elements">
          <div className="flex justify-between">
            <div className="expanded-song-info">
              <div className="white song-title-divs circular">
                {currentSongData.title}
              </div>
              <div className="E6DBDB circularLight pl1">
                {currentSongData.artist}
              </div>
            </div>
            <div
              onClick={() => likeSong(currentSongData.id)}
              className="duration-divs"
            >
              {currentSongData?.liked ? (
                <div className="flex justify-center w2">
                  <i className="fa-solid fa-heart green hover" />
                </div>
              ) : (
                <div className="flex justify-center w2">
                  <i className="fa-regular fa-heart hover" />
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="expanded-song-progress-div">
              <ProgressBar
                currentSongAudio={currentSongAudio}
                currentTime={currentTime}
                showFullBar={expanded}
                setCurrentTimeValue={setCurrentTimeValue}
              />
            </div>
            <div className="expanded-duration">
              <div className="grey font-size085 circularLight">
                {currentSongAudio ? parseInt(currentTime / 60) : "--:--"}:
                {currentSongAudio
                  ? parseInt(currentTime % 60) < 9
                    ? "0" + Math.ceil(currentTime % 60)
                    : Math.ceil(currentTime % 60)
                  : null}
              </div>
              <div className="grey font-size085 circularLight pl1">
                {"-"}
                {currentSongAudio ? remainingMinutes : null}:
                {/* remaining seconds */}
                {currentSongAudio
                  ? remainingSeconds < 10
                    ? "0" + remainingSeconds
                    : remainingSeconds
                  : "--:--"}
              </div>
            </div>
            <div className="flex expanded-third-row">
              <div className="p1">
                <i className="fa-solid fa-shuffle white hover" />
              </div>
              <div className="p1" onClick={() => prevSong(currentSongData.id)}>
                <i className="fa-solid fa-backward-step white hover" />
              </div>
              <div className="flex center current-play-btn-container">
                <div
                  style={{ color: "#" + currentSongData.hexColor }}
                  className="bgwhite play-btn"
                  onClick={(e) => {
                    playSong(currentSongData.id);
                  }}
                >
                  {currentSongData.isPlaying ? (
                    <i className="fa-solid fa-pause" />
                  ) : (
                    <i className="fa-solid fa-play" />
                  )}
                </div>
              </div>
              <div className="p1" onClick={() => skipSong(currentSongData.id)}>
                <i className="fa-solid fa-forward-step white hover" />
              </div>
              <div className="p1">
                <i className="fa-solid fa-repeat white hover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// TODO fix the camelCased classnames
