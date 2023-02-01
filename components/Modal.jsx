import React, { useEffect } from "react";
import styles from "../css/modal.module.css";

export default function Modal({ children, setShowModal, showModal }) {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  return (
    <div
      className={`${styles.overlay} ${showModal ? styles["show-overlay"] : ""}`}
    >
      <div
        className={`${styles.modal} ${showModal ? styles["show-modal"] : ""}`}
      >
        <div className={styles.closeBtn}>
          <div
            onClick={() => {
              setShowModal(!showModal);
            }}
            className={styles.closeBtn}
          >
            x
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}