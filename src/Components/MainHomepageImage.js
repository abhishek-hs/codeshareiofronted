import React from "react";

export default function MainHomepageImage() {
  return (
    <div className="container row">
      <div className="col-8 ">
        <div className="video-wrapper">
          <img
            src={require("../images/example-chrome2.png")}
            style={{ width: "100%" }}
          />
          <video
            src={require("../images/example-code.mp4")}
            className="video-1"
            autoPlay
            loop
            muted
          />
          <div className="video-right-wrapper">
            <video
              src={require("../images/example-user1.mp4")}
              className="video-2 w-100"
              autoPlay
              loop
              muted
            />
            <video
              src={require("../images/example-user2.mp4")}
              className="video-3 w-50 "
              autoPlay
              loop
            />
            <video
              src={require("../images/example-user3.mp4")}
              className="video-4 w-50"
              autoPlay
              loop
            />
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="video-wrapper">
          <img
            src={require("../images/example-chrome2.png")}
            style={{ width: "100%" }}
          />
          <video
            src={require("../images/example-code.mp4")}
            className="video-1"
            autoPlay
            loop
            muted
          />
          <div className="video-right-wrapper">
            <video
              src={require("../images/example-user1.mp4")}
              className="video-2 w-100"
              autoPlay
              loop
              muted
            />
            <video
              src={require("../images/example-user2.mp4")}
              className="video-3 w-50 "
              autoPlay
              loop
            />
            <video
              src={require("../images/example-user3.mp4")}
              className="video-4 w-50"
              autoPlay
              loop
            />
          </div>
        </div>
        <div className="video-wrapper mt-3">
          <img
            src={require("../images/example-chrome2.png")}
            style={{ width: "100%" }}
          />
          <video
            src={require("../images/example-code.mp4")}
            className="video-1"
            autoPlay
            loop
            muted
          />
          <div className="video-right-wrapper">
            <video
              src={require("../images/example-user1.mp4")}
              className="video-2 w-100"
              autoPlay
              loop
              muted
            />
            <video
              src={require("../images/example-user2.mp4")}
              className="video-3 w-50 "
              autoPlay
              loop
            />
            <video
              src={require("../images/example-user3.mp4")}
              className="video-4 w-50"
              autoPlay
              loop
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <p>
          <small>
            Used by software engineers at companies and universities we respect
            and admire.
          </small>
        </p>
        <p>
          <img
            src={require("../images/logos.png")}
            alt="Some of our users"
            width="800"
          />
        </p>
      </div>
    </div>
  );
}
