import React, { SetStateAction, useRef, useState } from "react";
import MessageNode from "../../ts/classes/MessageNode.class";
import { TNodesCollection } from "../../ts/types/NodesCollection.type";
import FunctionalMenu from "./FunctionalMenu/FunctionalMenu";
import LastFocusedCallbacksProvider, {
  TLastFocusedCallbacksContext,
} from "./LastFocusedCallbacksProvider/LastFocusedCallbacksProvider";
import MessageTemplate from "./MessageTemplate/MessageTemplate";
import styles from "./MessageTemplateEditor.module.css";
import PreviewMode from "./Preview/Preview";
import TopOptionsBar from "./TopOptionsBar/TopOptionsBar";

interface MessageTemplateEditorProps {
  arrVarNames: string[];
  template?: TNodesCollection;
  callbackSave: (template: TNodesCollection) => void;
  setIsEditorMode: React.Dispatch<SetStateAction<boolean>>;
}

const MessageTemplateEditor: React.FC<MessageTemplateEditorProps> = ({
  arrVarNames,
  template,
  callbackSave,
  setIsEditorMode,
}) => {
  // For selective rerendering on `clear template` action.
  const [, updateVisualRoot] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  /**
   * Using `useRef` for the template instead of `useState(template...)`
   * because that way it won't re-render the whole tree after every
   * single tiny change in some of subtrees.
   */
  const templateRef = useRef(template || [new MessageNode()]);
  /**
   * Using `useRef`-stored context-provided bunch of callbacks from the last
   * focused MessageBlock.
   *
   * When some MessageBlock handles onFocus it will
   * get the `lastFocusedMessageCallbacks.current` from the custom hook
   * `useLastFocusedMessageCallbacks(..)` and update its value.
   */
  const lastFocusedMessageCallbacks = useRef<
    TLastFocusedCallbacksContext | undefined
  >(undefined);

  function handlePreviewModeChange(newState: boolean) {
    lastFocusedMessageCallbacks.current = undefined;
    setIsPreviewMode(newState);
  }

  function handleClear() {
    templateRef.current = [new MessageNode()];
    lastFocusedMessageCallbacks.current = undefined;
    updateVisualRoot((s) => !s);
  }

  return (
    <LastFocusedCallbacksProvider value={lastFocusedMessageCallbacks}>
      {isPreviewMode ? (
        <PreviewMode
          template={templateRef.current}
          variablesNames={arrVarNames}
          onClose={() => handlePreviewModeChange(false)}
        />
      ) : (
        <div className={styles.messageTemplateEditor}>
          <h1 className={styles.mainHeader}>Message Template Editor</h1>
          <h3 className={styles.subHeader}>Edit message</h3>
          <TopOptionsBar arrVarNames={arrVarNames} />
          <h4 className={styles.sectionHeader}>Message template</h4>
          <MessageTemplate template={templateRef.current} />
          <FunctionalMenu
            onSave={() => callbackSave(templateRef.current)}
            onClose={() => setIsEditorMode(false)}
            onPreview={() => handlePreviewModeChange(true)}
            onClear={handleClear}
          />
        </div>
      )}
    </LastFocusedCallbacksProvider>
  );
};

export default MessageTemplateEditor;
