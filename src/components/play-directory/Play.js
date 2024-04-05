import React from "react";
import "./play.css";

export default function Play() {
  return (
    <div>
      <div className="justify-between play-main gotham">
        <div className="flex left-container center">
          <div className="play-btn-container circle flex w4 h4 hover">
            <i className="fa-solid fa-play header-play-btn flex center fa-xl" />
          </div>
          <div className="ml2 enhance-btn hover">Enhance</div>
          <div className="ml2 download-btn-container circle w4 h4 center hover">
            <i className="fa-solid fa-arrow-down flex center fa-xl" />
          </div>
          <div className="ml2 hover user-icon-div">
            <i className="fa-solid fa-user-plus fa-xl" />
          </div>
          <div className="more-options-div hover">•••</div>
        </div>
        <div className="right-container center">
          <div className="hover">
            <i className="fa-solid fa-magnifying-glass fa-xl" />
          </div>
          <div className="ml2 date-added-container hover">Date Added</div>
          <div>
            <i className="fa-solid fa-caret-down pl1 fa-xl hover" />
          </div>
        </div>
      </div>
      {/* mobile div */}
      <div className="mobile-play-main">
        <div className="flex-div-one">
          <div className="pl1 pr1">
            <i className="fa-regular fa-circle-down fa-2m" />
          </div>
          <div className="pr1">
            <i className="fa-solid fa-user-plus fa-2m" />
          </div>
          <div className="fa-2m">•••</div>
        </div>
        <div className="flex-div-two">
          <div>
            <i className="fa-solid fa-shuffle fa-2m" />
          </div>
          <div className="mobile-play-btn-container">
            <i className="fa-solid fa-play mobile-play-btn fa-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
