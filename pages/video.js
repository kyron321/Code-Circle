import React, { useEffect } from 'react';
import styles from '../css/video.module.css';

export default function Video() {
  let peerConnection = null;
  let localStream = null;
  let remoteStream = null;
  let roomDialog = null;
  let roomId = null;

  useEffect(() => {
    const getLocalMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      document.querySelector('#localUser').srcObject = stream;
      localStream = stream;
      console.log(stream);
    };
    getLocalMedia();
  }, []);

  return (
    <div className={styles.videoContainer}>
      <video id="localUser"></video>
      <video id="remoteUser"></video>
    </div>
  );
}
