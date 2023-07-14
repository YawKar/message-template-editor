import { TNodesCollection } from "../../types/NodesCollection.type";
import IBasicNode from "./BasicNode.interface";

export default interface IConditionalNode extends IBasicNode {
  kind: "conditional";
  ifChildren: TNodesCollection;
  thenChildren: TNodesCollection;
  elseChildren: TNodesCollection;
}
