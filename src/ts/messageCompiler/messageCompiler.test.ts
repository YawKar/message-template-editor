import ConditionalNode from "../classes/ConditionalNode.class";
import MessageNode from "../classes/MessageNode.class";
import { TNodesCollection } from "../types/NodesCollection.type";
import { compileTemplateTree } from "./messageCompiler";

it("compiles empty template to empty string", () => {
  expect(compileTemplateTree([], {})).toEqual("");
});

it("compiles template without tokens", () => {
  const message = "Bonsoir, ça va ?";
  expect(compileTemplateTree([new MessageNode(message)], {})).toEqual(message);
});

it("doesn't trim spaces in messages", () => {
  const message = "        many       trim      spaces";
  expect(compileTemplateTree([new MessageNode(message)], {})).toEqual(message);
});

it("replaces tokens", () => {
  const message = "Bonsoir {firstName}, ça va ?";
  const firstName = "Josephine";
  expect(
    compileTemplateTree([new MessageNode(message)], { firstName: firstName })
  ).toEqual(message.replace("{firstName}", firstName));
});

it("doesn't replace token if the corresponding variable doesn't exist", () => {
  const message = "abc{lol}def";
  expect(compileTemplateTree([new MessageNode(message)], {})).toEqual(message);
});

it("doesn't replace tokens that are embedded inside {}", () => {
  const message = "{{firstName}}";
  expect(
    compileTemplateTree([new MessageNode(message)], { firstName: "Vadim" })
  ).toEqual(message);
});

it("compiles if-then-else", () => {
  const template: TNodesCollection = [
    new MessageNode("First Message"),
    new ConditionalNode(
      [new MessageNode("{checkName}")],
      [new MessageNode("Variable exists")],
      [new MessageNode("Variable doesn't exist")]
    ),
    new MessageNode("Last Message"),
  ];
  const positive = "First MessageVariable existsLast Message";
  const negative = "First MessageVariable doesn't existLast Message";
  // Because it doesn't replace token if the corresponding variable doesn't exist
  expect(compileTemplateTree(template, {})).toEqual(positive);
  expect(compileTemplateTree(template, { checkName: "!" })).toEqual(positive);
  expect(compileTemplateTree(template, { checkName: "" })).toEqual(negative);
});
