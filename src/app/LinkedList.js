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
  append(value) {
    console.log('append',value)
    const newNode = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    console.log('after append',this)
    return this;
  }
}
const linkedList = new LinkedList()
export default linkedList