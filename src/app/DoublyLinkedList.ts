export interface INode {
  value: Value;
  next: DoublyLinkedListNode | null;
  //index: number;
  previous: DoublyLinkedListNode | null;
  toString(fn?: Fn): string;
}

export type Fn = (value: { [ket: string]: any }) => string;

export type Value = number | string | { [ket: string]: any };

export class DoublyLinkedListNode implements INode {
  constructor(
    public value: Value,
    //public index: number,
    public next: DoublyLinkedListNode | null = null,
    public previous: DoublyLinkedListNode | null = null,
  ) { }

  public toString(callback?: Fn): string {
    return callback
      ? callback(this.value as { [ket: string]: any })
      : `${this.value}`;
  }
}

export interface INodeList {
  head: DoublyLinkedListNode | null;
  tail: DoublyLinkedListNode | null;
  prepend(value: Value): Promise<any>;
  append(value: Value): Promise<any>;
  delete(value: Value): DoublyLinkedListNode | null;
  find(value?: Value | undefined): Promise<any> | null;
  deleteTail(): DoublyLinkedListNode | null;
  deleteHead(): DoublyLinkedListNode | null;
  //fromArray(values: Array<Value>): DoublyLinkedList;
  //toArray(): DoublyLinkedListNode[];
  //toString(callback?: Fn): string;
  //reverse(): DoublyLinkedList;
}

export class DoublyLinkedList implements INodeList {
  public head: DoublyLinkedListNode | null = null;
  public tail: DoublyLinkedListNode | null = null;
  static count: number = 0;
  static dataNode: any;
  async values(page: number): Promise<any> {
    console.log('values call')
    let current = this.head;

    let nodes = []
    while (current !== null) {
      //if (page === current.index) {
      nodes = []
      //console.log('ppppp', current.previous, current.next)
      if (current.previous) {
        const prev = await fetch(`${current.previous}`,
          { cache: 'force-cache' },
        );
        const dataPrev = await prev.json()
        const listPrev = dataPrev.near_earth_objects
        const arrObjectsPrev = Object.values(listPrev).flat(2)
        nodes = nodes.concat(arrObjectsPrev)//arrObjects[0]//small data
      }
      const self = await fetch(`${current.value}`,
        { cache: 'force-cache' },
      );
      const data = await self.json()
      const list = data.near_earth_objects
      const arrObjects = Object.values(list).flat(2)
      nodes = nodes.concat(arrObjects)//arrObjects[0]//small data
      if (current.next) {
        const next = await fetch(`${current.next}`,
          { cache: 'force-cache' },
        );
        const dataNext = await next.json()
        const listNext = dataNext.near_earth_objects
        const arrObjectsNext = Object.values(listNext).flat(2)
        nodes = nodes.concat(arrObjectsNext)//arrObjects[0]//small data
      }
      nodes = nodes.slice(0, 8)
      //const lastNodes=nodes.pop()
      //const lastItem = nodes.at(-1)//reduce?
      //console.log('nodes', nodes.length)
      //current=null //break while
      // }
      current = current.next;
    }
    return nodes
  }
  // Добавляем узел в начало списка.
  async prepend(value: Value): Promise<any> {
    // Создаем новый узел, который будет head.
    const newNode = new DoublyLinkedListNode(value, this.head);

    // Если есть head, то он больше не будет head.
    // Поэтому делаем его предыдущую (previous) ссылку на новый узел (new head).
    // Затем делаем новый узел head.

    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    // Если еще нет tail, сделаем новый узел tail.
    if (!this.tail) {
      this.tail = newNode;
    }
    DoublyLinkedList.dataNode = this

    return this;
  }

  // Добавляем узел в конец списка.
  async append(value: any): Promise<any> {
    //console.log('before append', value)
    if (value !== undefined) {
      const newNode = new DoublyLinkedListNode(value);

      if (this.tail) {
        // Присоединяем новый узел к концу связанного списка.
        this.tail.next = newNode;
      }

      // Присоединяем текущий tail к предыдущей (previous) ссылке нового узла.
      newNode.previous = this.tail;

      // Переназначаем tail на новый узел.
      this.tail = newNode;

      if (!this.head) {
        this.head = newNode;
      }
      DoublyLinkedList.count = DoublyLinkedList.count + 1
      DoublyLinkedList.dataNode = this
      console.log('after append', DoublyLinkedList.count)
      return this;
    }
  }

  delete(value: Value): DoublyLinkedListNode | null {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    let currentNode = this.head as DoublyLinkedListNode | null;

    while (currentNode) {
      if (currentNode.value === value) {
        deletedNode = currentNode;

        if (deletedNode === this.head) {
          // Если head должен быть удален..

          // Сделать следующий узел, новым head

          this.head = deletedNode.next;

          // Установить в новом head сслыку (previous) на ноль.
          if (this.head) {
            this.head.previous = null;
          }

          // Если все узлы в списке имеют одинаковое значение,
          // которое передается в качестве аргумента,
          // тогда все узлы будут удалены, поэтому tail необходимо обновить.

          if (deletedNode === this.tail) {
            this.tail = null;
          }
        } else if (deletedNode === this.tail) {
          // Если tail должен быть удален.abs
          // Установить tail на предпоследний узел, который станет новым tail.

          this.tail = deletedNode.previous as DoublyLinkedListNode;
          this.tail.next = null;
        } else {
          // Если средний узел будет удален ...
          const previousNode = deletedNode.previous as DoublyLinkedListNode;
          const nextNode = deletedNode.next as DoublyLinkedListNode;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deletedNode;
  }

  async find(value?: Value | undefined): Promise<any> | null {
    if (!this.head) {
      return null;
    }

    let currentNode: DoublyLinkedListNode | null = this.head;

    while (currentNode) {
      //console.log('zxzxz', currentNode.value, value)
      // Если указано значение, пробуем сравнить по значению.
      if (value !== undefined && currentNode.value === value) {
        //fetch
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail(): DoublyLinkedListNode | null {
    if (!this.tail) {
      return null;
    }

    const deletedTail = this.tail;

    if (this.tail.previous) {
      this.tail = this.tail.previous;
      this.tail.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedTail;
  }

  deleteHead(): DoublyLinkedListNode | null {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }
  async toArray(self: any): Promise<any> {
    const nodes = [];

    let currentNode = self//this.head;
    //while (currentNode) {
    //const resp = await fetch(`${this.dataNode.self}`,
    if (currentNode.previous) {
      const respP = await fetch(`${currentNode.previous}`,
        { cache: 'force-cache' }
      );
      const dataP = await respP.json()
      const listP = dataP.near_earth_objects
      const arrObjects22P = Object.values(listP)
      const resObj2P = arrObjects22P.flat()
      nodes.push(...resObj2P);
    }
    console.log('self', currentNode)
    const resp = await fetch(`${currentNode.value}`,
      { cache: 'force-cache' }
    );
    const data = await resp.json()
    const list = data.near_earth_objects
    const arrObjects22 = Object.values(list)
    const resObj2 = arrObjects22.flat()
    nodes.push(...resObj2);
    console.log('currentNode.next', currentNode.next)
    if (currentNode.next) {
      const respN = await fetch(`${currentNode.next}`,
        { cache: 'force-cache' }
      );
      const dataN = await respN.json()
      const listN = dataN.near_earth_objects
      const arrObjects22N = Object.values(listN)
      const resObj2N = arrObjects22N.flat()
      nodes.push(...resObj2N);
    }
    //currentNode = currentNode.next;
    //}

    return nodes;
  }

  /*reverse(): DoublyLinkedList {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      // Сохраняем следующий и предыдуший узел.
      nextNode = currNode.next;
      prevNode = currNode.previous;

      // Меняем следующий узел текущего узла, чтобы он ссылался с предыдущий узел.
      currNode.next = prevNode;
      currNode.previous = nextNode;

      // Перемещаем узлы prevNode и currNode на один шаг вперед.
      prevNode = currNode;
      currNode = nextNode;
    }

    // Сбрасываем head и tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }*/
}
const dll = new DoublyLinkedList()
export default dll