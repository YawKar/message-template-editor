import IBasicNode from "./BasicNode.interface";

export default interface IMessageNode extends IBasicNode {
  kind: "message";
  text: string;
}
