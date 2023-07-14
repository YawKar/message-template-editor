import ConditionalNode from "../classes/ConditionalNode.class";
import MessageNode from "../classes/MessageNode.class";
import { TNodesCollection } from "../types/NodesCollection.type";

export type VariablesMap = { [variableName: string]: string };

/**
 * Searches for all sequences of the form `"{anything}"` in the `text`
 * and returns an array of objects with `start` and `end` indices
 * where `start` is the index of the left `{` and `end` is the
 * index of a character after the right `}` (i.e. `end` is exclusive).
 * @param text
 * @returns array of matched groups
 */
function findTopLevelTokenGroups(text: string) {
  const foundGroups: Array<{ start: number; end: number }> = [];
  const stack: number[] = [];
  for (let i = 0; i < text.length; ++i) {
    if (text[i] === "{") {
      stack.push(i);
    } else if (text[i] === "}") {
      const left = stack.pop();
      // We are interested only in top level groups
      if (left !== undefined && stack.length === 0) {
        foundGroups.push({
          start: left,
          end: i + 1,
        });
      }
    }
  }
  return foundGroups;
}

/**
 * Replaces substring of the given `str` with `replacement` and returns new string.
 * @param str
 * @param start
 * @param end
 * @param replacement
 * @returns new string
 */
function spliceString(
  str: string,
  start: number,
  end: number,
  replacement: string
) {
  return str.slice(0, start) + replacement + str.slice(end);
}

/**
 * Searches for all token groups and then replaces them if they exist in `variableState`,
 * otherwise ignores and treats them as text.
 * @param text text with tokens
 * @param variablesState tokens names and values
 * @returns
 */
function enrichTextWithVariables(text: string, variablesState: VariablesMap) {
  const foundTokenGroups = findTopLevelTokenGroups(text);
  let indexOffset = 0;
  for (const group of foundTokenGroups) {
    // Taking innards of the group. For example: '{{blah {blah}-kek}}' -> {blah {blah}-kek}
    const token = text.slice(
      group.start + 1 + indexOffset,
      group.end - 1 + indexOffset
    );
    if (token in variablesState) {
      text = spliceString(
        text,
        group.start + indexOffset,
        group.end + indexOffset,
        variablesState[token]
      );
      indexOffset += variablesState[token].length - (group.end - group.start);
    }
  }
  return text;
}

/**
 * Compiles string result from the given conditional `node`.
 * If compiled `if` branch results into non-zero sized string,
 * then returns compiled `then` branch.
 * Otherwise returns compiled `else` branch.
 * @param node conditional node
 * @param variablesState tokens names and values
 * @returns compiled and enriched string
 */
function compileConditionalNode(
  node: ConditionalNode,
  variablesState: VariablesMap
) {
  const ifCompiled = compileTemplateTree(node.ifChildren, variablesState);
  if (ifCompiled.length > 0) {
    return compileTemplateTree(node.thenChildren, variablesState);
  } else {
    return compileTemplateTree(node.elseChildren, variablesState);
  }
}

/**
 * Compiles string result from the given message `node`.
 * Enriches it using variables state from `variablesState`.
 * @param node
 * @param variablesState
 * @returns
 */
function compileMessageNode(node: MessageNode, variablesState: VariablesMap) {
  return enrichTextWithVariables(node.text, variablesState);
}

/**
 * Enriches the given template using variables from `variablesState` and
 * compiles it into string.
 * @param template array of nodes representing a template
 * @param variablesState
 * @returns compiled enriched string
 */
export function compileTemplateTree(
  template: TNodesCollection,
  variablesState: VariablesMap
) {
  let result = "";
  for (const node of template) {
    switch (node.kind) {
      case "conditional":
        result += compileConditionalNode(node, variablesState);
        break;
      case "message":
        result += compileMessageNode(node, variablesState);
        break;
    }
  }
  return result;
}
