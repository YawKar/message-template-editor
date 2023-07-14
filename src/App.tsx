import { useState } from "react";
import styles from "./App.module.css";
import MessageTemplateEditor from "./components/MessageTemplateEditor/MessageTemplateEditor";
import StartupView from "./components/StartupView/StartupView";
import {
  getArrVarNamesOrDefault,
  getTemplateOrDefault,
  saveTemplateToLocalStorage,
} from "./ts/utils/utils";

function App() {
  const [isEditorMode, setIsEditorMode] = useState(false);

  return (
    <div className={styles.App}>
      {isEditorMode ? (
        <MessageTemplateEditor
          arrVarNames={getArrVarNamesOrDefault()}
          template={getTemplateOrDefault()}
          callbackSave={saveTemplateToLocalStorage}
          setIsEditorMode={setIsEditorMode}
        />
      ) : (
        <StartupView onClick={() => setIsEditorMode(true)} />
      )}
    </div>
  );
}

export default App;
