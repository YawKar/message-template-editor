import { TLastFocusedCallbacksContext } from "../../components/MessageTemplateEditor/LastFocusedCallbacksProvider/LastFocusedCallbacksProvider";
import ConditionalNode from "../classes/ConditionalNode.class";
import MessageNode from "../classes/MessageNode.class";
import { TNodesCollection } from "../types/NodesCollection.type";

export function handleDeleteIfChild(
  id: number,
  children: TNodesCollection,
  lastFocusedMessageCallbacks: React.MutableRefObject<
    TLastFocusedCallbacksContext | undefined
  >,
  updateVisualRoot: (cb: (s: boolean) => boolean) => void
) {
  lastFocusedMessageCallbacks.current = undefined;
  const childIndex = children.findIndex((child) => child.id === id);
  const prevText = (children[childIndex - 1] as MessageNode).text;
  const nextText = (children[childIndex + 1] as MessageNode).text;
  children.splice(childIndex - 1, 3, new MessageNode(prevText + nextText));
  updateVisualRoot((s) => !s);
}

export function handleMessageChange(text: string, node: MessageNode) {
  node.text = text;
}

export function handleIfSplit(
  firstSlice: string,
  secondSlice: string,
  id: number,
  children: TNodesCollection,
  lastFocusedMessageCallbacks: React.MutableRefObject<
    TLastFocusedCallbacksContext | undefined
  >,
  updateVisualRoot: (cb: (s: boolean) => boolean) => void
) {
  lastFocusedMessageCallbacks.current = undefined;
  const childIndex = children.findIndex((child) => child.id === id);
  children.splice(
    childIndex,
    1,
    new MessageNode(firstSlice),
    new ConditionalNode(
      [new MessageNode()],
      [new MessageNode()],
      [new MessageNode()]
    ),
    new MessageNode(secondSlice)
  );
  updateVisualRoot((s) => !s);
}
