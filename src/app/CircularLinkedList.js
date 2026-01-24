class Node {
  constructor(value) {
    this.value = value;
    this.next = null; // Изначально null
  }
}

export class CircularLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Добавление элемента в конец
    async append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head; // Замыкаем на себя
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head; // Указываем на голову
        }
        this.size++;
    }

    // Обход списка
    print() {
        if (!this.head) return;
        let current = this.head;
        do {
            console.log(current.value);
            current = current.next;
        } while (current !== this.head);
    }
    async toArray() {
        const nodes = [];
        if (!this.head) return;
        let current = this.head;
        do {
            console.log(current.value);
            current = current.next;
            nodes.push(currentNode);
        } while (current !== this.head);
        /*let currentNode = this.head;
        while (currentNode) {
          nodes.push(currentNode);
          currentNode = currentNode.next;
        }*/

        return nodes;
    }
}

// Использование
const cll = new CircularLinkedList();
//cll.print(); // Выведет: 1, 2, 3
export default cll
