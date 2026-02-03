/*class TaskQueue {
    constructor(concurrency) {
        this.queue = [];
        this.concurrency = concurrency;
        this.running = 0;
    }

    async runTask(task) {
        if (this.running >= this.concurrency) {
            await new Promise(resolve => this.queue.push(resolve));
        }
        this.running++;
        try {
            await task();
        } finally {
            this.running--;
            if (this.queue.length > 0) {
                this.queue.shift()();
            }
        }
    }

    addTask(task) {//async?
        return this.runTask(task);
    }
}
export const queue = new TaskQueue(2);
export default TaskQueue*/
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    // Добавление задачи: чем меньше число, тем выше приоритет (0 - самый высокий)
    enqueue(task, priority) {
        console.log('vnvnvn', priority)
        this.queue.push({ task, priority });
        this.queue.sort((a, b) => a.priority - b.priority); // Сортировка по приоритету
    }

    async process() {
        console.log('this.queue.length', this.queue.length)
        while (this.queue.length > 0) {
            const { task } = this.queue.shift(); // Берем задачу с наивысшим приоритетом
            await task(); // Ожидаем выполнение асинхронной задачи
        }
    }
    static asyncTask = (name, time) => () => new Promise(resolve => {
        console.log(`Начало: ${name}`);
        setTimeout(() => {
            console.log(`Конец: ${name}`);
            resolve();
        }, time);
    });
}

// Использование
const pq = new PriorityQueue();
export default pq//PriorityQueue

/*pq.enqueue(asyncTask("Низкий приоритет", 1000), 10);
pq.process();*/
// Сначала выполнится "Высокий приоритет", затем "Низкий приоритет"
