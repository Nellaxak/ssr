//import Item from "./Item";
//'use server'
class LinkedListNode {
  constructor(value, next = null, prev = null) {
    this.value = value;
    //this.error = error;
    this.next = next;
    //this.prev = prev;
  }
  /*get value() {
    console.log("Getting the radius value");
    return this.value;
  }
  set value(newValue) {
    //console.log("Getting the radius value");
    this.value = newValue;
  }*/
}
export default class LinkedList {
  static arrObj = new Map();
  static instance = null;
  static length = 0;
  static head = null;
  constructor() {
    if (LinkedList.instance) {
      //console.log('double call')
      return LinkedList.instance; // Return the existing instance
    } else {
      LinkedList.instance = this;
      this.head = null;
      this.tail = null;
    }
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
    //console.log('before append', value.name, LinkedList.arrObj.has(Number(value.id)))
    if (!LinkedList.arrObj.has(Number(value.id))) {
      //const value = new Item(Number(value1.id), value1)
      LinkedList.arrObj.set(Number(value.id), value)
      const newNode = new LinkedListNode(value);
      if (!this.head || !this.tail) {
        this.head = newNode;
        LinkedList.head = this.head;
        this.tail = newNode;
        return this;
      }
      this.tail.next = newNode;
      //newNode.prev = this.tail;
      this.tail = newNode;
      LinkedList.length = LinkedList.length + 1
      if (LinkedList.length >= 9) {
        //delete from head+9
      }
      //console.log('after append', this)
      //console.log('after append', this.head, this.tail)
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
    //console.log('nodes length', nodes.length)
    return nodes;
  }
  async fromArray(values) {
    const nodes = [];
    //add filter exsist
    values.forEach(async (value) => {
      //console.log('value', value)
      const node = await this.append(value)
      nodes.push(node);
    });
    //add observer dispatch
    return nodes;
  }
  /*static async getAll(method) {
    let current = LinkedList.head;
    while (current) {
      //console.log(current.value);
      current = current.next;
      console.log('bbbh',method(current.value))
      return await method(current.value);
    }
  }*/
}
export const linkedList = new LinkedList()
//export linkedList/*async function ffff(){
//return
//}*/