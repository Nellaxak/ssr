//import Item from "./Item";
'use server'
class LinkedListNode {
  constructor(value, next = null, prev = null) {
    this.value = value;
    //this.error = error;
    this.next = next;
    //this.prev = prev;
  }
}
class LinkedList {
  static arrObj = new Map();
  constructor() {
    //if (!LinkedList._instance) {// Singleton
    //LinkedList._instance = this;
    //this.head = null;
    //this.tail = null;
    //}
    //return LinkedList._instance;
    if (LinkedList.instance) {
      return LinkedList.instance; // Return the existing instance
    }
    LinkedList.instance = this;
    this.head = null;
    this.tail = null;
  }
  find(value) {
    let current = this.head; // Start at the beginning

    // Traverse until the end of the list (current becomes null)
    while (current !== null) {
      if (current.data === value) {
        return current; // Return the node if a match is found
      }
      current = current.next; // Move to the next node
    }

    return null; // Return null if the value is not found after traversing the whole list
  }
  async append(value) {
    console.log('before append', value.name, LinkedList.arrObj.has(Number(value.id)))
    if (!LinkedList.arrObj.has(Number(value.id))) {
      //const value = new Item(Number(value1.id), value1)
      LinkedList.arrObj.set(Number(value.id), value)
      const newNode = new LinkedListNode(value);
      if (!this.head || !this.tail) {
        this.head = newNode;
        this.tail = newNode;
        return this;
      }
      this.tail.next = newNode;
      //newNode.prev = this.tail;
      this.tail = newNode;
      //console.log('after append', this)
      console.log('after append', this.head, this.tail)
    }
    return this;
  }
  async delete(value) {//object
    console.log('before delete', value.name)
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
  async toArray() {
    const nodes = [];

    let currentNode = this.head;

    // Перебираем все узлы и добавляем в массив.
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    // Возвращаем массив из всех узлов.
    console.log('nodes length', nodes.length)
    return nodes;
  }
  async fromArray(values) {
    console.log('fromArray')
    values.forEach(async (value) => {
      //console.log('value', value)
      await this.append(value)
    });

    return this;
  }
}
const linkedList = new LinkedList()
export default async function ffff(){
  return linkedList
}
//linkedList