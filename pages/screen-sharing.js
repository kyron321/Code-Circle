import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useRef, useEffect } from "react";
import { db } from "../firebase/config";
import checkLoggedIn from "../hooks/checkLoggedIn";

export default function ScreenSharing() {
  const [localPc, setLocalPc] = useState(null);
  const [getDisplayMediaError, setGetDisplayMediaError] = useState(null);
  const [isStartCaptureButtonDisabled, setIsStartCaptureButtonDisabled] =
    useState(false);
  const [isStopCaptureButtonDisabled, setIsStopCaptureButtonDisabled] =
    useState(true);
  const [
    isStartScreenShareButtonDisabled,
    setIsStartScreenShareButtonDisabled,
  ] = useState(true);
  const [isStopScreenShareButtonDisabled, setIsStopScreenShareButtonDisabled] =
    useState(true);
  checkLoggedIn();

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun2.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  useEffect(() => {
    setLocalPc(new RTCPeerConnection(servers));
  }, []);

  let localStream = null;
  let remoteStream = null;

  const localVidRef = useRef(null);

  const displayMediaOptions = {
    video: {
      displaySurface: "window",
    },
    audio: false,
  };

  function startScreenCapture(displayMediaOptions) {
    return navigator.mediaDevices
      .getDisplayMedia(displayMediaOptions)
      .then((response) => {
        localStream = response;
        localVidRef.current.srcObject = localStream;

        remoteStream = new MediaStream();

        localStream.getTracks().forEach((track) => {
          localPc.addTrack(track, localStream);
        });

        setIsStartCaptureButtonDisabled(true);
        setIsStopCaptureButtonDisabled(false);
        setIsStartScreenShareButtonDisabled(false);
      })
      .catch((error) => {
        console.error(`Error:${error}`);
        setGetDisplayMediaError(error);
        return null;
      });
  }

  function stopScreenCapture() {
    let tracks = localVidRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    localVidRef.current.srcObject = null;
    setIsStartCaptureButtonDisabled(false);
    setIsStopCaptureButtonDisabled(true);
    setIsStartScreenShareButtonDisabled(true);
    setIsStopScreenShareButtonDisabled(true);
  }

  function startScreenShare() {
    setIsStartScreenShareButtonDisabled(true);
    setIsStopScreenShareButtonDisabled(false);
  }

  function stopScreenShare() {
    setIsStartScreenShareButtonDisabled(false);
    setIsStopScreenShareButtonDisabled(true);
  }

  return (
    <main>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Screen Sharing</h1>

      <button
        onClick={startScreenCapture}
        disabled={isStartCaptureButtonDisabled}
      >
        Start Screen Capture
      </button>
      <button
        onClick={stopScreenCapture}
        disabled={isStopCaptureButtonDisabled}
      >
        Stop Screen Capture
      </button>
      <br />
      <button
        onClick={startScreenShare}
        disabled={isStartScreenShareButtonDisabled}
      >
        Start Screen Share
      </button>
      <button
        onClick={stopScreenShare}
        disabled={isStopScreenShareButtonDisabled}
      >
        Stop Screen Share
      </button>

      <br />

      <video style={{ width: "100%" }} ref={localVidRef} autoPlay></video>
      <br />
      {/* <video style={{width: '100%'}} ref={remoteVidRef} autoPlay></video> */}

      <strong>Log:</strong>
      <br />
      <pre>{getDisplayMediaError}</pre>
    </main>
  );
}
