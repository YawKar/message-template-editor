import React, { useRef, useState } from "react";
import {
  handleDeleteIfChild,
  handleIfSplit,
  handleMessageChange,
} from "../../ts/handlers/handlers";
import { TNodesCollection } from "../../ts/types/NodesCollection.type";
import { convertNodesToComponents } from "../../ts/utils/utils";
import { useLastFocusedMessageCallbacks } from "../MessageTemplateEditor/LastFocusedCallbacksProvider/LastFocusedCallbacksProvider";
import styles from "./ConditionalBlock.module.css";

interface ConditionalBlockProps {
  ifChildren: TNodesCollection;
  thenChildren: TNodesCollection;
  elseChildren: TNodesCollection;
  onDelete: () => void;
}

const ConditionalBlock: React.FC<ConditionalBlockProps> = ({
  ifChildren,
  thenChildren,
  elseChildren,
  onDelete,
}) => {
  const [, updateVisualRoot] = useState(false);
  const lastFocusedMessageCallbacks = useLastFocusedMessageCallbacks();
  const ifChildrenRef = useRef(ifChildren);
  const thenChildrenRef = useRef(thenChildren);
  const elseChildrenRef = useRef(elseChildren);

  /**
   * Helps to generate boilerplate for each of conditional branches.
   * @param paritionWord
   * @param collection
   * @returns
   */
  const makePartition = (
    paritionWord: "if" | "then" | "else",
    collection: TNodesCollection
  ) => {
    return (
      <div className={styles[paritionWord + "Part"]}>
        <div className={styles[paritionWord + "Word"]}>
          {paritionWord.toUpperCase()}
        </div>
        <div className={styles[paritionWord + "Children"]}>
          {convertNodesToComponents(
            collection,
            (id: number) =>
              handleDeleteIfChild(
                id,
                collection,
                lastFocusedMessageCallbacks,
                updateVisualRoot
              ),
            (firstSlice: string, secondSlice: string, id: number) =>
              handleIfSplit(
                firstSlice,
                secondSlice,
                id,
                collection,
                lastFocusedMessageCallbacks,
                updateVisualRoot
              ),
            handleMessageChange
          )}
        </div>
      </div>
    );
  };

  const ifPart = makePartition("if", ifChildrenRef.current);
  const thenPart = makePartition("then", thenChildrenRef.current);
  const elsePart = makePartition("else", elseChildrenRef.current);

  return (
    <div className={styles.conditionalBlock}>
      <div className={styles.deleteBar}>
        <button className={styles.deleteButton} onClick={onDelete}>
          X
        </button>
        <div className={styles.longTrail}></div>
      </div>
      <div className={styles.conditionalParts}>
        {ifPart}
        {thenPart}
        {elsePart}
      </div>
    </div>
  );
};

export default ConditionalBlock;
