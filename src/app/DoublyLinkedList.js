import React,{createElement} from 'react';
import ClLi from './components/ClLi';
//import ClUl from './components/ClUl';
//import FcContent from './components/FcContent';
import ClContent from './components/ClContent';


export const UlChildren={time:0}
//+getter/setter/reactivity/proxy
const handler = {
  get(target, property) {
    //console.log('345',target,property)
    //console.log(`Getting property ${property}`)
    return target[property]//return [createElement,createElement]
  },
  set(target, property, value) {
    console.log(`Setting property ${property} to value ${value}`)
    target[property] = value
    return true // Индикатор успешной установки значения свойства
  },
}
const pizza = {
  child: 'Margherita',
  toppings: ['mozzarella', 'tomato sauce'],
}
export const proxiedPizza = new Proxy(pizza, handler)
//console.log(proxiedPizza.child) // 'Getting property name' и 'Margherita'
//proxiedPizza.name = 'Pepperoni'
pizza[Symbol.iterator] = function() {
  return {
  next() {
    return { done: true };
  }}
}
/*const pages = {
  'ClLi': ClLi,
  'ClUl': ClUl,
}; */
class DoublyLinkedListNode {
    constructor(value,next = null, previous = null) {
      this.value = value;//component
      this.child = next;//fiber child
      this.sibling=null
      this.return = previous;//fiber return
      this.visited=false
      //_________________
      this.rendered=false
      this.mounted=false
    }
  
    toString(callback) {
      return callback ? callback(this.value) : `${this.value}`;
    }
    //должен быть symbol iterator
    //next() должен вернуть createElement
    [Symbol.iterator] = function() {//итерироваться по объекту
      console.log('Symbol node',this)//2
      const $this=this
          return {
            value: $this.value,
            rendered: $this.rendered,
            next() {//двойной next()-итерация по прототипу и по его объекту
              console.log('678*',$this,this.rendered)
              if (!this.rendered) {
                //console.log('step',this.currentNode )
                 //const ttt=createComponentInstance(this.componentName)
                  console.log('444*',this.value)
                  //отмечать как посещенные
            //мутирующее изменение объекта
            this.rendered=true
                  //value-следующее значение в итерационной последовательности
                  //createElement
                return { done: false, value: this.value.render()};
              } else {
                  //console.log('stop',this.currentNode )
                return { done: true}
              }
            }
          };
        };
  }
  /*function createComponentInstance(value){//tag leaf=>?add <li>
    //const Page = pages[value];
    console.log('createComponentInstance',value)
    //children не передаются напрямую [createElement,createElement],
    //результат обхода бинарного дерева
    //изменить child property fiber?
    //createElement(value,null,[])//_owner,_self:null
    const ggg=new ClContent({children:'ghjkl'})//new Page()
    console.log('ggg',ggg,ggg.render(),ggg.componentDidMount())//
    return ggg.render()//createElement('span',null,333)
  }*/
  class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
    }
    prepend(value) {
        // Создаём новый узел, который будет новым head,
        // при создании передаём второй аргумент, который указывает
        // что его "next" будет текущий head,
        // так как новый узел будет стоять перед текущем head.
        const newNode = new DoublyLinkedListNode(value, this.head);
      
        // Если есть head, то он больше не будет head.
        // Поэтому, его ссылку на предыдущий узел (previous) меняем на новый узел.
        if (this.head) {
          this.head.return = newNode;
        }
      
        // Переназначаем head на новый узел
        this.head = newNode;
      
        // Если ещё нет tail, делаем новый узел tail.
        if (!this.tail) {
          this.tail = newNode;
        }
      
        // Возвращаем весь список.
        return this;
      }
      append(value) {
        console.log('nameComponent',value)
        // Создаём новый узел.
        const newNode = new DoublyLinkedListNode(value);
      
        if (this.tail) {
          // Присоединяем новый узел к концу связного списка.
          this.tail.child = newNode;//child=next
        }
      
        // В новом узле указываем ссылку на предыдущий (previous) элемент на this.tail,
        // так как новый узел будет теперь последним.
        newNode.return = this.tail;//previous
      
        // Переназначаем tail на новый узел.
        this.tail = newNode;
      
        // Если ещё нет head, делаем новый узел head.
        if (!this.head) {
          this.head = newNode;
        }
      console.log('append',this.head)
        return this;
      }
      findParent(value) {//найти узел у которого нет next(child),
      //получить previous (component), передать ему props.children
      console.log('parent',value.return)//component instance(value) not list node
        return value.return//this.currentNode;
      }
      find(value) {
        console.log('8901', this.head)
        // Если нет head - список пуст.
        if (!this.head) {
          return null;
        }
      
        let currentNode = this.head;
        console.log('890', currentNode, value)
      
        // Перебираем все узлы в поиске значения.
        while (currentNode) {
          // Если указано значение, пробуем сравнить его по значению.
          if (value !== undefined && currentNode.value === value) {
          console.log('567',value,currentNode,)
            return currentNode;
          }
      
          // Перематываем на один узел вперед.
          currentNode = currentNode.child;//next;
        }
      console.log('find',currentNode)
        //.createComponentInstance())
        return currentNode;
      }
[Symbol.iterator] = function() {//итерироваться по объекту
//console.log('Symbol',this)//2
const $this=this
    return {
      currentNode: $this.head,
      next() {//4-двойной next()-итерация по прототипу и по его объекту
        //console.log('678',this.currentNode,Boolean(this.currentNode))
        if (this.currentNode!==null){
        console.log('678***',this.currentNode.value.render())
        }
        if (Boolean(this.currentNode)&&!this.currentNode.visited) {
          //console.log('step',this.currentNode )
          //отмечать как посещенные
            //мутирующее изменение объекта
            this.currentNode={...this.currentNode,visited:true}
            //tree traverse
            //мутирующее изменение объекта=>4
            this.currentNode = this.currentNode.child;
            //{...this.currentNode}.child
            console.log('4441',this.currentNode)
            //value-следующее значение в итерационной последовательности
            //не createElement, а fiber (err render root)
          return { done: false, value: this.currentNode};
        } else {
            //console.log('stop',this.currentNode )
          return { done: true}
        }
      }
    };
  };
  }
   const dlist=new DoublyLinkedList()
  export default dlist
