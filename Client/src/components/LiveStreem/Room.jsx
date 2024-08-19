import React, { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [joined, setJoined] = useState(false);
  const [role, setRole] = useState("");

  const myMeeting = (role) => {
    const appID = 1457610972;
    const serverSecret = "995c7b15cc26ecc235dd0db2261bb86f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      role === "host" ? "Host" : "Viewer"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    let scenario;
    if (role === "host") {
      scenario = {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          maxUsers: 100,
        },
      };
    } else if (role === "viewer") {
      scenario = {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
        config: {
          maxUsers: 2,
        },
      };
    }

    zp.joinRoom({
      container: videoContainerRef.current,
      sharedLinks: [
        {
          name: "Video Call Link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?role=" +
            encodeURIComponent(role),
        },
      ],
      scenario,
      onJoinRoom: () => {
        setJoined(true);
      },
      onLeaveRoom: () => {
        navigate("/");
      },
    });
  };

  const handleExit = () => {
    if (zpRef.current) {
      zpRef.current.destroy();
    }
    navigate("/");
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const role = query.get("role");

    setRole(role);
  }, [location.search]);

  useEffect(() => {
    if (role) {
      myMeeting(role);
    }

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [role, roomId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!joined && (
        <>
          <header className="text-2xl font-semibold mb-4 text-gray-800">
            {role === "host" ? "Live Streaming" : "Viewing Stream"}
          </header>
        </>
      )}
      <div
        ref={videoContainerRef}
        className=" rounded-xl border w-full border-gray-300 mt-4"
      />
    </div>
  );
}

export default Room;
