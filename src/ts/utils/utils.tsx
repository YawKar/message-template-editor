import ConditionalBlock from "../../components/ConditionalBlock/ConditionalBlock";
import MessageBlock from "../../components/MessageBlock/MessageBlock";
import ConditionalNode from "../classes/ConditionalNode.class";
import MessageNode from "../classes/MessageNode.class";
import { TNodesCollection } from "../types/NodesCollection.type";

/**
 * Tries to get array of variables names from the cache.
 * Otherwise returns hardcoded defaults.
 * @returns array of variable names
 */
export function getArrVarNamesOrDefault() {
  const arrVarNames: string[] = localStorage.arrVarNames
    ? JSON.parse(localStorage.arrVarNames)
    : ["firstname", "lastname", "company", "position"];
  return arrVarNames;
}

/**
 * Tries to get template structure from the cache.
 * Otherwise returns undefined.
 * @returns array of variable names or undefined
 */
export function getTemplateOrDefault(): TNodesCollection | undefined {
  if (localStorage.template) {
    return JSON.parse(
      localStorage.template,
      (key, val: TNodesCollection | MessageNode | ConditionalNode) => {
        if (Array.isArray(val)) {
          return val;
        } else if (typeof val === "object") {
          if (val.kind === "conditional") {
            return new ConditionalNode(
              val.ifChildren,
              val.thenChildren,
              val.elseChildren
            );
          } else {
            return new MessageNode(val.text);
          }
        }
        return val;
      }
    );
  }
}

/**
 * Stores the given template structure into the local storage cache.
 * @param template
 */
export async function saveTemplateToLocalStorage(template: TNodesCollection) {
  localStorage.setItem("template", JSON.stringify(template));
}

/**
 * Helper function that generates boilerplate code for the given collection.
 *
 * Use it to convert some template into interactive React elements tree.
 * @param collection collection of nodes (essentially a template)
 * @param handleDeleteChildById handle to call if some conditional child wants to delete itself
 * @param handleSplitByIf handle to call if some message child needs to split
 * @param handleMessageChange handle if some message child's text changed
 * @returns
 */
export function convertNodesToComponents(
  collection: TNodesCollection,
  handleDeleteChildById: (id: number) => void,
  handleSplitByIf: (
    firstSlice: string,
    secondSlice: string,
    id: number
  ) => void,
  handleMessageChange: (text: string, node: MessageNode) => void
) {
  return collection.map((node) => {
    switch (node.kind) {
      case "conditional":
        return (
          <ConditionalBlock
            key={node.id}
            ifChildren={node.ifChildren}
            thenChildren={node.thenChildren}
            elseChildren={node.elseChildren}
            onDelete={() => handleDeleteChildById(node.id)}
          />
        );
      case "message":
        return (
          <MessageBlock
            key={node.id}
            text={node.text}
            onChange={(text: string) => handleMessageChange(text, node)}
            onSplitByIf={(firstSlice: string, secondSlice: string) =>
              handleSplitByIf(firstSlice, secondSlice, node.id)
            }
          />
        );
      default:
        const _exhaustiveCheck: never = node;
        return _exhaustiveCheck;
    }
  });
}
