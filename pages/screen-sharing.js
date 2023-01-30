import { useState, useRef } from 'react';

export default function ScreenSharing() {
  const vidRef = useRef(null);

  const gdmOptions = {
    video: true,
    audio: true,
  };

  const displayMediaOptions = {
    video: {
      displaySurface: 'window',
    },
    audio: false,
  };

  function startCapture(displayMediaOptions) {
    navigator.mediaDevices
      .getDisplayMedia(displayMediaOptions)
      .then((mediaStream) => {
        console.log(mediaStream);
        vidRef.current.srcObject = mediaStream;
      })
      .catch((err) => {
        console.error(`Error:${err}`);
        return null;
      });
  }

  function stopCapture() {
    let tracks = vidRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    vidRef.current.srcObject = null;
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

      <button onClick={startCapture}>Start Screen Capture</button>
      <button onClick={stopCapture}>Stop Screen Capture</button>

      <br />

      <video style={{ width: '100%' }} ref={vidRef} autoPlay></video>

      <br />

      <strong>Log:</strong>
      <br />
      <pre id="log"></pre>
    </main>
  );
}
