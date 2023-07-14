import React, { useLayoutEffect, useRef } from "react";
import styles from "./CompiledMessageView.module.css";

interface CompiledMessageViewProps {
  compiledMessage: string;
}

const CompiledMessageView: React.FC<CompiledMessageViewProps> = ({
  compiledMessage,
}) => {
  const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);
  useLayoutEffect(autosizeTextarea);

  function autosizeTextarea() {
    if (textareaRef.current) {
      const tarea = textareaRef.current;
      tarea.style.height = "auto";
      tarea.style.height = tarea.scrollHeight + 5 + "px";
    }
  }

  return (
    <div className={styles.messageView}>
      <p className={styles.charCount}>
        Estimated length: {compiledMessage.length}
      </p>
      <textarea
        ref={textareaRef}
        className={styles.compiledMessageArea}
        value={compiledMessage}
        readOnly={true}
      ></textarea>
    </div>
  );
};

export default CompiledMessageView;
