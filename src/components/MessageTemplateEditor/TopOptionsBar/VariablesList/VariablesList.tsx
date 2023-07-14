import React from "react";
import { useLastFocusedMessageCallbacks } from "../../LastFocusedCallbacksProvider/LastFocusedCallbacksProvider";
import styles from "./VariablesList.module.css";

interface VariablesListProps {
  arrVarNames: string[];
}

const VariablesList: React.FC<VariablesListProps> = ({ arrVarNames }) => {
  const lastFocusedMessageCallbacks = useLastFocusedMessageCallbacks();

  function onClickedInsertVariableName(variableName: string) {
    if (lastFocusedMessageCallbacks.current) {
      lastFocusedMessageCallbacks.current.insertVariableToken(variableName);
    }
  }

  return (
    <div className={styles.variablesList}>
      {arrVarNames.map((variableName, index) => (
        <button
          className={styles.variableButton}
          key={index}
          onClick={() => onClickedInsertVariableName(`{${variableName}}`)}
        >{`{${variableName}}`}</button>
      ))}
    </div>
  );
};

export default VariablesList;
