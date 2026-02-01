class Singleton {
    static _instance = null
    constructor() {
        if (!Singleton._instance) {
            Singleton._instance = this;
        }
        return Singleton._instance;
    }

    // Example method
    getData() {
        return 'Hello from Singleton';
    }
}

//const instance1 = new Singleton();
//const instance2 = new Singleton();

//console.log(instance1 === instance2); // true, both reference the same instance
