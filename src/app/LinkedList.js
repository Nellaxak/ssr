import Item from "./Item";
export class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    //this.error = error;
    this.next = next;
  }
}
export class LinkedList {
  static arrObj = new Map();
  constructor(type) {
    this.head = null;
    this.tail = null;
  }
  append(value1) {
    //console.log('before append', value1)
    const value = new Item(Number(value1.id), value1)
    LinkedList.arrObj.set(Number(value.id), this)
    const newNode = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    //console.log('after append', this)
    return this;
  }
  delete(value) {//object
    // Если нет head значит список пуст.
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // Если head должен быть удален, то делаем следующий узел новым head.
    //const obj = LinkedListNode.arrObj.get(Number(this.value.id))
    while (this.head && this.head.value === value) {
      console.log('41')
      deletedNode = this.head;

      // Переназначаем следующий за head узел на новый head.
      this.head = this.head.next;
    }

    let currentNode = this.head;

    // Если следующий узел должен быть удален,
    // делаем узел через один, следующим для проверки.
    // Перебираем все узлы и удаляем их, если их значение равно указанному.
    if (currentNode !== null) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          console.log('ddddwww')
          deletedNode = currentNode.next;
          // Перезаписываем, чтобы узел через один стал следующим узлом.
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Проверяем, должен ли tail быть удален.
    // Так как, если в цикле мы удаляем последний узел,
    // то с предпоследнего узла убираем только ссылку на него.
    // Поэтому делаем проверку на его удаление с "tail".
    if (this.tail && this.tail.value === value) {
      console.log('lopnnn')
      // в данном случае currentNode это или предпоследний узел или head.
      this.tail = currentNode;
    }

    return deletedNode;
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
    console.log('nodes', nodes)
    return nodes;
  }
  fromArray(values) {
    values.forEach(value => this.append(value));

    return this;
  }
}
const linkedList = new LinkedList()
export default linkedList