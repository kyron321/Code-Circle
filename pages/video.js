const APP_ID = '493c12c1user1.current53e4411b901885ac9db802b4';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import styles from '../css/video.module.css';
import Image from 'next/image';
import camera from '../images/camera.png';
import mic from '../images/mic.png';
import phone from '../images/phone.png';

const getAgoraRTM = async () => {
  const AgoraRTM = (await import('agora-rtm-sdk')).default;

  return AgoraRTM;
};

export default function Video() {
  const router = useRouter();
  const user1 = useRef();
  const user2 = useRef();
  const cameraButton = useRef();

  if (typeof window !== 'undefined') {
    let client;
    let channel;

    let roomId = 'test';

    let localStream;
    let remoteStream;
    let peerConnection;

    const servers = {
      iceServers: [
        {
          urls: [
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
          ],
        },
      ],
    };

    let constraints = {
      video: {
        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 480, ideal: 1080, max: 1080 },
      },
      audio: true,
    };
    if (!roomId) {
      // router.push('/video-lobby');
    }

    const init = async () => {
      let uid = String(Math.floor(Math.random() * 10000));
      let token = null;

      const callAgora = await getAgoraRTM();

      client = callAgora.createInstance(APP_ID);
      await client.login({ uid, token });
      channel = client.createChannel(roomId);
      await channel.join();

      channel.on('MemberJoined', handleUserJoined);
      channel.on('MemberLeft', handleUserLeft);

      client.on('MessageFromPeer', handleMessageFromPeer);

      localStream = await navigator.mediaDevices.getUserMedia(constraints);
      user1.current.srcObject = localStream;
    };

    let handleUserLeft = (MemberId) => {
      user2.current.style.display = 'none';
      user1.current.classList.remove('smallFrame');
    };

    let handleMessageFromPeer = async (message, MemberId) => {
      message = JSON.parse(message.text);

      if (message.type === 'offer') {
        createAnswer(MemberId, message.offer);
      }

      if (message.type === 'answer') {
        addAnswer(message.answer);
      }

      if (message.type === 'candidate') {
        if (peerConnection) {
          peerConnection.addIceCandidate(message.candidate);
        }
      }
    };

    let handleUserJoined = async (MemberId) => {
      console.log('A new user joined the channel:', MemberId);
      createOffer(MemberId);
    };

    let createPeerConnection = async (MemberId) => {
      peerConnection = new RTCPeerConnection(servers);

      remoteStream = new MediaStream();
      console.log(user2);
      user2.current.srcObject = remoteStream;
      user2.current.style.display = 'block';

      user1.current.classList.add('smallFrame');

      if (!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        user1.current.srcObject = localStream;
      }

      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
      };

      peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
          client.sendMessageToPeer(
            {
              text: JSON.stringify({
                type: 'candidate',
                candidate: event.candidate,
              }),
            },
            MemberId
          );
        }
      };
    };

    let createOffer = async (MemberId) => {
      await createPeerConnection(MemberId);

      let offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      client.sendMessageToPeer(
        { text: JSON.stringify({ type: 'offer', offer: offer }) },
        MemberId
      );
    };

    let createAnswer = async (MemberId, offer) => {
      await createPeerConnection(MemberId);

      await peerConnection.setRemoteDescription(offer);

      let answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      client.sendMessageToPeer(
        { text: JSON.stringify({ type: 'answer', answer: answer }) },
        MemberId
      );
    };

    let addAnswer = async (answer) => {
      if (!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answer);
      }
    };

    let leaveChannel = async () => {
      await channel.leave();
      await client.logout();
    };

    window.addEventListener('beforeunload', leaveChannel);

    init();
  }
  let toggleCamera = async () => {
    let videoTrack = localStream
      .getTracks()
      .find((track) => track.kind === 'video');

    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      document.getElementById('camera-btn').style.backgroundColor =
        'rgb(255, 80, 80)';
    } else {
      videoTrack.enabled = true;
      document.getElementById('camera-btn').style.backgroundColor =
        'rgb(179, 102, 249, .9)';
    }
  };

  let toggleMic = async () => {
    let audioTrack = localStream
      .getTracks()
      .find((track) => track.kind === 'audio');

    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      document.getElementById('mic-btn').style.backgroundColor =
        'rgb(255, 80, 80)';
    } else {
      audioTrack.enabled = true;
      document.getElementById('mic-btn').style.backgroundColor =
        'rgb(179, 102, 249, .9)';
    }
  };

  return (
    <main>
      <div id="videos">
        <video
          className={styles.videoPlayer}
          ref={user1}
          autoPlay
          playsInLine
        ></video>
        <video
          className={styles.videoPlayer}
          ref={user2}
          autoPlay
          playsInLine
        ></video>
      </div>

      <div id="controls">
        <div
          className={styles.controlContainer}
          id="camera-btn"
          ref={cameraButton}
          onClick={() => toggleCamera()}
        >
          <Image src={camera} alt="camera Icon" />
        </div>

        <div
          className="control-container"
          id="mic-btn"
          onClick={() => toggleMic}
        >
          <Image src={mic} alt="mic Icon" />
        </div>

        <a href="lobby.html">
          <div className="control-container" id="leave-btn">
            <Image src={phone} alt="phone Icon" />
          </div>
        </a>
      </div>
    </main>
  );
}
