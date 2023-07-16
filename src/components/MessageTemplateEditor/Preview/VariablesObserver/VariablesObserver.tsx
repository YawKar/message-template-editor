import React from "react";
import { VariablesMap } from "../../../../ts/messageCompiler/messageCompiler";
import styles from "./VariablesObserver.module.css";

interface VariablesObserverProps {
  variablesState: VariablesMap;
  setVariablesMap: (state: VariablesMap) => void;
}

const VariablesObserver: React.FC<VariablesObserverProps> = ({
  variablesState,
  setVariablesMap: setVariablesState,
}) => {
  function handleValueChange(variableName: string, value: string) {
    setVariablesState({ ...variablesState, [variableName]: value });
  }

  return (
    <div className={styles.variablesFieldsList}>
      {Object.entries(variablesState).map(([variableName, variableValue]) => (
        <div key={variableName} className={styles.variableField}>
          <label className={styles.variableFieldName} htmlFor={variableName}>
            {`{${variableName}}`}
          </label>
          <input
            className={styles.variableFieldInput}
            id={variableName}
            value={variableValue}
            placeholder="Optional value"
            onChange={(e) => handleValueChange(variableName, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default VariablesObserver;
