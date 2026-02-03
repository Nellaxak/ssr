/*import worker_threads from 'node:worker_threads';
const { Worker, isMainThread, parentPort } = require('worker_threads');
console.log('worker_threads', worker_threads, Worker)*/
class LinkedListNode {
  constructor(value, visible = 1, next = null, prev = null) {
    console.log('LinkedListNode', this)
    this.value = value;
    //this.visible = visible;
    //this.error = error;
    this.next = next;
    //this.prev = prev;
    this.status = false;
    this.getStatus = this.getStatus.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }
  async getStatus() {
    //console.log('setStatus', this.value.id, this.status)
    let statusItem = 'ЗАКАЗАТЬ'
    if (this.status === false) {
      statusItem = 'ЗАКАЗАТЬ'
    }
    else if (this.status === true) {
      statusItem = 'В КОРЗИНЕ'
    } else {
      console.log('err status', params)
    }
    //console.log('format return', params, statusItem)
    return statusItem
  }
  async setStatus() {
    console.log('setStatus', this.value.id, this.status)
    //setTimeout(() => { 
    this.status = !this.status// }, 0)
  }
}
export default class LinkedList {
  static instance = null;
  //static head = null;
  constructor() {
    if (LinkedList.instance) {
      //console.log('double call')
      return LinkedList.instance; // Return the existing instance
    } else {
      LinkedList.instance = this;
      this.head = null;
      this.tail = null;
    }
    this.find = this.find.bind(this);
    this.append = this.append.bind(this);
    this.fromArray = this.fromArray.bind(this);
    this.toArray = this.toArray.bind(this);
  }
  async find(id) {
    let current = this.head; // Start at the beginning

    // Traverse until the end of the list (current becomes null)
    while (current !== null) {
      if (current.value.id === id) {
        return current; // Return the node if a match is found
      }
      current = current.next; // Move to the next node
    }

    return null; // Return null if the value is not found after traversing the whole list
  }
  async append(value) {
    //console.log('before append', value.name, LinkedList.arrObj.has(Number(value.id)))
    //if (!LinkedList.arrObj.has(Number(value.id))) {
    //const value = new Item(Number(value1.id), value1)
    //LinkedList.arrObj.set(Number(value.id), value)
    const newNode = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      //LinkedList.head = this.head;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    //newNode.prev = this.tail;
    this.tail = newNode;
    //LinkedList.length1 = LinkedList.length1 + 1
    //if (LinkedList.length >= 9) {
    //delete from head+9
    // }
    //console.log('after append', this)
    //console.log('after append', this.head, this.tail)
    //}
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
      //add currentNode.status
      //nodes.push(currentNode.value);
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    // Возвращаем массив из всех узлов.
    //console.log('nodes length', nodes.length)
    return nodes;
  }
  async fromArray(values) {
    //const nodes = []//await this.toArray()

    //add filter exsist
    values.forEach(async (value) => {
      //const node = 
      await this.append(value)
      /*if (node) {
        //console.log('nodepp', node)
        nodes.push(value);
      }*/
    });
    //return nodes;
  }
}
export const linkedList = new LinkedList()
//export linkedList/*async function ffff(){
//return
//}*/