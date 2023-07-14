import IConditionalNode from "../interfaces/nodes/ConditionalNode.interface";
import { TNodesCollection } from "../types/NodesCollection.type";
import BasicNode from "./BasicNode.class";

export default class ConditionalNode
  extends BasicNode
  implements IConditionalNode
{
  readonly kind: "conditional";
  ifChildren: TNodesCollection;
  thenChildren: TNodesCollection;
  elseChildren: TNodesCollection;

  constructor(
    ifChildren: TNodesCollection,
    thenChildren: TNodesCollection,
    elseChildren: TNodesCollection
  ) {
    super();
    this.kind = "conditional";
    this.ifChildren = ifChildren;
    this.thenChildren = thenChildren;
    this.elseChildren = elseChildren;
  }
}
