import React from "react";
import styles from "./FunctionalMenu.module.css";

interface FunctionalMenuProps {
  onSave: () => void;
  onClose: () => void;
  onPreview: () => void;
  onClear: () => void;
}

const FunctionalMenu: React.FC<FunctionalMenuProps> = ({
  onSave,
  onClose,
  onPreview,
  onClear,
}) => {
  return (
    <div>
      <button className={styles.previewButton} onClick={onPreview}>
        Preview
      </button>
      <button className={styles.saveButton} onClick={onSave}>
        Save
      </button>
      <button className={styles.clearButton} onClick={onClear}>
        Clear
      </button>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default FunctionalMenu;
