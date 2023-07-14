import IMessageNode from "../interfaces/nodes/MessageNode.interface";
import BasicNode from "./BasicNode.class";

export default class MessageNode extends BasicNode implements IMessageNode {
  readonly kind: "message";
  text: string;

  constructor(text?: string) {
    super();
    this.kind = "message";
    this.text = text || "";
  }
}
