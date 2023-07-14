import React, { useState } from "react";
import {
  handleDeleteIfChild,
  handleIfSplit,
  handleMessageChange,
} from "../../../ts/handlers/handlers";
import { TNodesCollection } from "../../../ts/types/NodesCollection.type";
import { convertNodesToComponents } from "../../../ts/utils/utils";
import { useLastFocusedMessageCallbacks } from "../LastFocusedCallbacksProvider/LastFocusedCallbacksProvider";

interface MessageTemplateProps {
  template: TNodesCollection;
}

const MessageTemplate: React.FC<MessageTemplateProps> = ({ template }) => {
  const [, updateVisualTemplateRoot] = useState(false);
  const lastFocusedMessageCallbacks = useLastFocusedMessageCallbacks();
  return (
    <div>
      {convertNodesToComponents(
        template,
        (id: number) =>
          handleDeleteIfChild(
            id,
            template,
            lastFocusedMessageCallbacks,
            updateVisualTemplateRoot
          ),
        (firstSlice: string, secondSlice: string, id: number) =>
          handleIfSplit(
            firstSlice,
            secondSlice,
            id,
            template,
            lastFocusedMessageCallbacks,
            updateVisualTemplateRoot
          ),
        handleMessageChange
      )}
    </div>
  );
};

export default MessageTemplate;
