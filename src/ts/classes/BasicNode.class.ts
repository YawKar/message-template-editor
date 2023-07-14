import IBasicNode from "../interfaces/nodes/BasicNode.interface";

export default class BasicNode implements IBasicNode {
  readonly id: number;

  constructor() {
    this.id = BasicNode.getLastId();
  }

  private static lastUniqueId = 0;
  private static getLastId() {
    return BasicNode.lastUniqueId++;
  }
}
