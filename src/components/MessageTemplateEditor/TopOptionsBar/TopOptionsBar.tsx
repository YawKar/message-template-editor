import React from "react";
import { useLastFocusedMessageCallbacks } from "../LastFocusedCallbacksProvider/LastFocusedCallbacksProvider";
import styles from "./TopOptionsBar.module.css";
import VariablesList from "./VariablesList/VariablesList";

interface TopOptionsBarProps {
  arrVarNames: string[];
}

const TopOptionsBar: React.FC<TopOptionsBarProps> = ({ arrVarNames }) => {
  const lastFocusedMessageCallbacks = useLastFocusedMessageCallbacks();

  /**
   * Handles click on the button `IF~THEN~ELSE`.
   *
   * Calls callback provided by the last focused `MessageBlock`.
   */
  function onClickedSplitMessageByIf() {
    if (lastFocusedMessageCallbacks.current) {
      lastFocusedMessageCallbacks.current.splitMessageByIf();
    }
  }

  return (
    <div className={styles.topOptionsBar}>
      <div>
        <h4 className={styles.sectionHeader}>Variables</h4>
        <VariablesList arrVarNames={arrVarNames} />
      </div>
      <div>
        <h4 className={styles.manipulationsHeader}>Manipulations</h4>
        <button
          className={styles.ifThenElseButton}
          onClick={onClickedSplitMessageByIf}
        >
          IF ~ THEN ~ ELSE
        </button>
      </div>
    </div>
  );
};

export default TopOptionsBar;
