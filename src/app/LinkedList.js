import Item from "./Item";
class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    //this.error = error;
    this.next = next;
  }
}
export class LinkedList {
  constructor(type) {
    this.head = null;
    this.tail = null;
  }
  append(value1) {
    console.log('before append', value1)
    const value = new Item(Number(value1.id), value1)
    const newNode = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    console.log('after append', this)
    return this;
  }
  toArray() {
    const nodes = [];

    let currentNode = this.head;

    // Перебираем все узлы и добавляем в массив.
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    // Возвращаем массив из всех узлов.
    return nodes;
  }
  fromArray(values) {
    values.forEach(value => this.append(value));

    return this;
  }
}
const linkedList = new LinkedList()
export default linkedList