import React, { useLayoutEffect, useRef } from "react";
import { useLastFocusedMessageCallbacks } from "../MessageTemplateEditor/LastFocusedCallbacksProvider/LastFocusedCallbacksProvider";
import styles from "./MessageBlock.module.css";

interface MessageBlockProps {
  text: string;
  onChange: (text: string) => void;
  onSplitByIf: (firstSlice: string, secondSlice: string) => void;
}

const MessageBlock: React.FC<MessageBlockProps> = ({
  text,
  onChange,
  onSplitByIf,
}) => {
  const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);
  const charCountRef: React.RefObject<HTMLParagraphElement> = useRef(null);
  const lastFocusedCallbacks = useLastFocusedMessageCallbacks();
  useLayoutEffect(autosizeTextarea);
  useLayoutEffect(updateCharCounter);
  useLayoutEffect(() => {
    if (lastFocusedCallbacks.current === undefined) {
      handleFocus();
    }
  });

  function insertVariableToken(variableToken: string) {
    if (textareaRef.current) {
      const text = textareaRef.current.value;
      const start = textareaRef.current.selectionStart;
      const firstSlice = text.slice(0, start) + variableToken;
      textareaRef.current.value = firstSlice + text.slice(start);
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        firstSlice.length,
        firstSlice.length
      );
      handleChange(textareaRef.current.value);
    }
  }

  function splitMessageByIf() {
    if (textareaRef.current) {
      const text = textareaRef.current.value;
      const start = textareaRef.current.selectionStart;
      const firstSlice = text.slice(0, start);
      const secondSlice = text.slice(start);
      // Calls parent's handler that will split this node.
      onSplitByIf(firstSlice, secondSlice);
    }
  }

  function handleFocus() {
    lastFocusedCallbacks.current = {
      insertVariableToken,
      splitMessageByIf,
    };
  }

  function autosizeTextarea() {
    if (textareaRef.current) {
      const tarea = textareaRef.current;
      tarea.style.height = "auto";
      tarea.style.height = tarea.scrollHeight + 5 + "px";
    }
  }

  function updateCharCounter() {
    if (charCountRef.current) {
      charCountRef.current.innerHTML = String(
        textareaRef.current?.value.length
      );
    }
  }

  function handleChange(text: string) {
    autosizeTextarea();
    updateCharCounter();
    onChange(text);
  }

  return (
    <div className={styles.messageBlock}>
      <p ref={charCountRef} className={styles.charCount}></p>
      <textarea
        ref={textareaRef}
        className={styles.messageArea}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={handleFocus}
        defaultValue={text}
        placeholder="Optional text"
      ></textarea>
    </div>
  );
};

export default MessageBlock;
