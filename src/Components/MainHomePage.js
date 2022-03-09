import React from "react";
import MainHomepageImage from "./MainHomepageImage";
import { useNavigate } from "react-router-dom";

export default function MainHomePage() {
  const Navigate = useNavigate();
  return (
    <div className="container custom">
      <div className="headline text-center">
        <h1>Share Code in Real-time with Developers</h1>
        <h2>
          An online code editor for interviews, troubleshooting, teaching &amp;
          more…
        </h2>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <p>
          <button
            className="btn-primary-custom"
            rel="nofollow"
            onClick={() =>
              Navigate(`/${(Math.random() + 1).toString(36).substring(6)}`)
            }
          >
            Share Code Now
          </button>
        </p>
        <p>
          <small>Share code for free.</small>
        </p>
      </div>
      <MainHomepageImage />
    </div>
  );
}
