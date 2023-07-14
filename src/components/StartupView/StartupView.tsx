import React from "react";
import styles from "./StartupView.module.css";

interface StartupViewProps {
  onClick: () => void;
}

const StartupView: React.FC<StartupViewProps> = ({ onClick }) => {
  return (
    <div className={styles.startupView}>
      <div className={styles.mainInfo}>
        <button className={styles.openEditorButton} onClick={onClick}>
          Launch Message Template Editor
        </button>
      </div>
    </div>
  );
};

export default StartupView;
