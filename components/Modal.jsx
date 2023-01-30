
import React from "react";
import styles from "../css/modal.module.css";

export default function Modal({ children, setShowModal, showModal }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
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