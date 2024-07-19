
interface NodeList {
  map<NodeType extends Node, MappedType>(
  this: NodeListOf<NodeType>,
  callback: (value: NodeType, index: number, list: NodeListOf<NodeType>) => MappedType
): MappedType[];
}