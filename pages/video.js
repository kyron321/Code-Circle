import React, { useEffect } from 'react';
import styles from '../css/video.module.css';

export default function Video() {
  let peerConnection = null;
  let localStream = null;
  let remoteStream = null;
  let roomDialog = null;
  let roomId = null;

  const servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const pc = new RTCPeerConnection(servers);

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
      <video
        muted
        autoplay
        playsinline
        className={styles.localUser}
        id="localUser"
      ></video>
      <video
        autoplay
        playsinline
        className={styles.remoteUser}
        id="remoteUser"
      ></video>
    </div>
  );
}
