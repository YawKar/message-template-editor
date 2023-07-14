import React, { useState } from "react";
import {
  compileTemplateTree,
  VariablesMap,
} from "../../../ts/messageCompiler/messageCompiler";
import { TNodesCollection } from "../../../ts/types/NodesCollection.type";
import CompiledMessageView from "./CompiledMessageView/CompiledMessageView";
import styles from "./Preview.module.css";
import VariablesObserver from "./VariablesObserver/VariablesObserver";

interface PreviewModeProps {
  template: TNodesCollection;
  onClose: () => void;
  variablesNames: string[];
}

/**
 * Generates default variables state using provided names.
 *
 * Defaults all values to empty string.
 * @param variablesNames
 * @returns
 */
const generateVariablesState: (variablesName: string[]) => VariablesMap = (
  variablesNames
) => {
  const variablesMap: VariablesMap = {};
  variablesNames.forEach((val) => (variablesMap[val] = ""));
  return variablesMap;
};

const PreviewMode: React.FC<PreviewModeProps> = ({
  template,
  onClose,
  variablesNames,
}) => {
  const [variablesMap, setVariablesMap] = useState(() =>
    generateVariablesState(variablesNames)
  );

  return (
    <div className={styles.preview}>
      <h1 className={styles.mainHeader}>Message Template Preview</h1>
      <div className={styles.previewPanels}>
        <div className={styles.compiledMessagePanel}>
          <h3 className={styles.subHeader}>Compiled Message</h3>
          <CompiledMessageView
            compiledMessage={compileTemplateTree(template, variablesMap)}
          />
        </div>
        <div className={styles.variablesObserverPanel}>
          <h3 className={styles.subHeader}>Edit variables</h3>
          <VariablesObserver
            variablesState={variablesMap}
            setVariablesMap={setVariablesMap}
          />
        </div>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default PreviewMode;
