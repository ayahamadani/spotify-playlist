import React, { useState, useEffect, useRef } from "react";
import profileIcon from "./icon.jpeg";
import playlistIcon from "./playlist-icon.jpeg";
import "./header.css";
import SongsData from "../songs-directory/songs/SongsData";

export default function Header() {
  const inputRef = useRef(null);
  const [playlistDuration, setPlaylistDuration] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [topDivBgColor, setTopDivBgColor] = useState(false);
  const [headerTitleTransition, setHeaderTitleTransition] = useState(false);
  const [maxLength, setMaxLength] = useState(1000);
  const [playlistTitleMaxLength, setPlaylistTitleMaxLength] = useState(45);
  const [playlistIconTransitionMobile, setPlaylistIconTransitionMobile] =
    useState(false);
  const [mobileTopDivBgColor, setMobileTopDivBgColor] = useState(false);

  const text =
    "My friends say i have a hyperfixation on music. Adding to that, i usually repeat the same top ten liked songs. Therefore, this is a playlist of my, most likely, top ten liked songs in which i listen to on repeat.";
  useEffect(() => {
    const handleScroll = () => {
      const triggerPosition = 350;
      if (window.scrollY > triggerPosition) {
        setMobileTopDivBgColor(true);
      } else {
        setMobileTopDivBgColor(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileTopDivBgColor]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPosition = 150;
      if (window.scrollY > triggerPosition) {
        setPlaylistIconTransitionMobile(true);
      } else {
        setPlaylistIconTransitionMobile(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [playlistIconTransitionMobile]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPosition = 350;
      if (window.scrollY > triggerPosition) {
        setTopDivBgColor(true);
      } else {
        setTopDivBgColor(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topDivBgColor]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPosition = 440;
      if (window.scrollY > triggerPosition) {
        setHeaderTitleTransition(true);
      } else {
        setHeaderTitleTransition(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerTitleTransition]);

  useEffect(() => {
    let totalDuration = 0;
    SongsData.forEach((song) => {
      totalDuration += song.duration;
    });
    setPlaylistDuration(totalDuration);
  }, []);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const updateMaxLength = () => {
    if (window.innerWidth > 800 && window.innerWidth < 1250) {
      setMaxLength(110);
    } else {
      setMaxLength(300);
    }
    if (window.innerWidth > 800 && window.innerWidth < 951) {
      setPlaylistTitleMaxLength(30);
    } else {
      setPlaylistTitleMaxLength(45);
    }
  };

  useEffect(() => {
    updateMaxLength();
    window.addEventListener("resize", updateMaxLength);
    return () => {
      window.removeEventListener("resize", updateMaxLength);
    };
  }, []);

  return (
    <div className="header color-white">
      {/* first row */}
      <div
        className={
          topDivBgColor
            ? "first-header-row justify-between fade-in-transition"
            : "first-header-row justify-between fade-out-transition"
        }
      >
        <div className="flex p1">
          <div className="flex">
            <div className="h4 w4 flex center circle hover C1E1E">
              <i className="fa-regular fa-less-than fa-xl" />
            </div>
            <div className="h4 w4 flex center circle ml1 A3A not-allowed">
              <i className="fa-regular fa-greater-than fa-xl" />
            </div>
          </div>
          <div
            className={
              headerTitleTransition
                ? "circular header-playlist-title header-playlist-title-in-transition"
                : "circular header-playlist-title header-playlist-title-out-transition"
            }
          >
            <h1>Yes, i play the same 5 songs on repeat for hours.</h1>
          </div>
        </div>

        <div className="flex p1">
          <div className="h4 w4 circle flex center hover C1E1E">
            <i className="fa-regular fa-bell fa-xl" />
          </div>
          <div className="h4 w4 circle flex center hover C1E1E ml1">
            <i className="fa-solid fa-users fa-xl" />
          </div>
          <div className="h4 w4 circle flex center hover C1E1E ml1">
            <img
              src={profileIcon}
              alt="profile-icon"
              className="circle icon-img"
            />
          </div>
        </div>
      </div>

      {/* second row */}
      <div className="second-header-row">
        {/* mobile arrow */}
        <div
          className={
            mobileTopDivBgColor
              ? "circular mobile-header mobile-header-transition-in"
              : "circular mobile-header mobile-header-transition-out"
          }
        >
          <div className="left-arrow-div">
            <i className="fa-regular fa-less-than fa-xl" />
          </div>
          <h2>Yes, i play the same 5 songs on repeat for hours.</h2>
        </div>

        <div className="arrow-icon-container">
          <div
            className={
              playlistIconTransitionMobile
                ? "playlist-icon-div image-transition-in"
                : "playlist-icon-div image-transition-out"
            }
            onClick={handleClick}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="Selected" className="playlist-icon" />
            ) : (
              <img
                src={playlistIcon}
                alt="playlist-icon"
                className="playlist-icon"
              />
            )}
            <div className="hover-div">
              <div id="pen-container">
                <i className="fa-solid fa-pen fa-xl header-big-font" />
              </div>
              <div className="gotham trasnlate-y none" id="choose-photo-text">
                Choose photo
              </div>
            </div>

            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              ref={inputRef}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="second-row-second-div">
          <div>
            <h2 className="circularLight pbhalf header-small-font public-playlist">
              Public Playlist
            </h2>
          </div>
          <div>
            <h1 className="circular header-big-font" id="playlist-title">
              {playlistTitleMaxLength === 45
                ? "Yes, i play the same 5 songs on repeat for hours."
                : "Yes, i play the same 5 songs on repeat for hours.".slice(
                    0,
                    playlistTitleMaxLength
                  ) + "..."}
            </h1>
          </div>
          <div className="flex ">
            <h2 className="circularLight C5C7C3 lh1p7 header-small-font truncated-text">
              {maxLength === 300 ? text : text.slice(0, maxLength) + "..."}
            </h2>
          </div>
          <div className="header-info-div">
            <div className="h4 w4 flex align-end">
              <img
                src={profileIcon}
                alt="icon-img"
                className="circle icon-img playlist-info-icon-img"
              />
            </div>
            <div className="flex align-end gotham pbhalf fs1 playlist-info">
              <h2 id="songs-number">Aya • {SongsData.length} songs,</h2>
              <h2 className="C5C7C3 playlist-duration">
                &nbsp; {parseInt(playlistDuration / 3600)} hours{" "}
                {Math.floor(playlistDuration / 60)} min
              </h2>
            </div>
          </div>
          {/* info container for mobile */}
          <div className="header-info-div-mobile">
            <div className="h3 w3 flex gotham center img-container">
              <img
                src={profileIcon}
                alt="icon-img"
                className="circle icon-img ml1"
              />
              <h4 className="plhalf">Aya</h4>
            </div>
            <div className="flex align-end gotham fs1 C5C7C3">
              <i className="fa-solid fa-globe" />
              <h4 className="plhalf">&nbsp;1 hr 5 min</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
