class TaskQueue {
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

    addTask(task) {
        return this.runTask(task);
    }
}
export const queue = new TaskQueue(2);
export default TaskQueue