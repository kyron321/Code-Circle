import React, { useEffect, useRef, useState } from "react";
import styles from "../css/video.module.css";
import { db } from "../firebase/config";
import {
  collection,
  getDoc,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import checkLoggedIn from "../hooks/checkLoggedIn";
import { motion } from "framer-motion";

import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { MdScreenShare } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { useRouter } from "next/router";

const buttonVariants = {
  hover: {
    scale: 1.06,
  },
  tap: {
    scale: 0.99,
  },
};

export default function Video() {
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [roomId, setRoomId] = useState(null);
  checkLoggedIn();
  let localStream = null;
  let remoteStream = null;
  let peerConnection = useRef();
  const roomIdInput = useRef();
  const localUser = useRef();
  const remoteUser = useRef();
  const router = useRouter();

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  useEffect(() => {
    peerConnection.current = new RTCPeerConnection(servers);
  }, []);

  const getLocalMedia = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    localUser.current.srcObject = localStream;

    setIsCameraStarted(true);
    getRemoteMedia();
  };

  const getRemoteMedia = () => {
    remoteStream = new MediaStream();

    peerConnection.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    remoteUser.current.srcObject = remoteStream;
  };

  const createCall = async (e) => {
    e.preventDefault();

    const callDoc = doc(collection(db, "calls"));
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    setRoomId(callDoc.id);

    peerConnection.current.onicecandidate = (event) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offerDescription);
    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer });

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.current.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);

        peerConnection.current.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.current.addIceCandidate(candidate);
        }
      });
    });
    setIsRoomCreated(true);
    {
      navigator.clipboard.writeText(callDoc.id);
    }
  };

  const answerCall = async (e) => {
    e.preventDefault();
    const callId = roomIdInput.current.value;
    const callDoc = doc(collection(db, "calls"), callId);
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    peerConnection.current.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await getDoc(callDoc)).data();

    const offerDescription = callData.offer;
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offerDescription)
    );

    const answerDescription = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };
    await updateDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.current.addIceCandidate(candidate);
        }
      });
    });
  };

  function hangUp() {
    const tracks = localUser.current.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
    }

    if (peerConnection.current) {
      peerConnection.current.close();
    }
    setIsCameraStarted(false);
  }

  async function startScreenCapture() {
    const sender = peerConnection.current.getSenders()[1];
    const displayMediaOptions = {
      video: {
        displaySurface: "window",
      },
      audio: false,
    };
    const screenCapture = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    localStream = screenCapture;
    const screenShareTrack = localStream.getTracks()[0];
    sender.replaceTrack(screenShareTrack);
    localUser.current.srcObject = screenCapture;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.exitContainer}>
        <RxExit
          onClick={() => {
            router.back();
          }}
          className={styles.exit}
        />
      </div>

      <div className={styles.videoContainer}>
        <video
          muted
          autoPlay
          playsInline
          className={styles.localUser}
          ref={localUser}
        ></video>
        <video
          autoPlay
          playsInline
          className={styles.remoteUser}
          ref={remoteUser}
        ></video>
      </div>
      <div className={styles.formAndButtonContainer}>
        {!isCameraStarted ? (
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={getLocalMedia}
            className={styles.startCameraButton}
          >
            <BsFillCameraVideoFill />
          </motion.button>
        ) : (
          <div className={styles.buttonContainer}>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={!isCameraStarted}
              onClick={hangUp}
              className={styles.startCameraButton}
            >
              <BsFillCameraVideoOffFill />
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={!isCameraStarted}
              onClick={startScreenCapture}
              className={styles.startCameraButton}
            >
              <MdScreenShare />
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={!isCameraStarted}
              onClick={createCall}
              className={styles.startCameraButton}
            >
              <FaUserPlus />
            </motion.button>
          </div>
        )}

        {isRoomCreated ? (
          <div className={styles.roomCreatedDialogue}>
            Room created with id of <code>{roomId}</code>
            <br />
            Code copied to clipboard
          </div>
        ) : null}

        <form onSubmit={answerCall} className={styles.form}>
          <input
            id="call-id-input"
            type="text"
            defaultValue={roomId}
            placeholder={"Add your invite code"}
            ref={roomIdInput}
            className={styles.input}
          />
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={answerCall}
            className={styles.button}
          >
            Join call
          </motion.button>
        </form>
      </div>
    </div>
  );
}
