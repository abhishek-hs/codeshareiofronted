import React, { useEffect, useContext } from "react";
import { SocketContext } from "./SocketContext";

const Room = () => {
  const { userVideo, CallOnline, TurnOnsocket } = useContext(SocketContext);

  useEffect(() => {
    TurnOnsocket();
  }, []);

  return (
    <div>
      <div style={{ width: 300, height: "fit-content" }}>
        {CallOnline && (
          <video
            playsInline
            autoPlay
            muted
            ref={userVideo}
            style={{
              pointerEvents: "none",
              transform: "rotateY(180deg)",
              width: "100%",
            }}
          />
        )}
      </div>
      <div
        id="videoContainer"
        style={{ width: 300, height: "fit-content" }}
      ></div>
    </div>
  );
};

export default Room;
