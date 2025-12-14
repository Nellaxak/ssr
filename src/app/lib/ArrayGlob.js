let array3 = []
const handler = {
    get: function (target, prop, receiver) {
        console.log(`Getting property: ${String(prop)}`);
        // Crucial: Call the original method on the *target* array, 
        // but bind its context to the *proxy* (receiver) so traps are triggered internally.
        if (typeof target[prop] === 'function') {
            return function (...args) {
                console.log(`Calling method: ${String(prop)} with arguments: ${args}`);
                // Use Reflect.apply to call the method correctly
                const result = Reflect.apply(target[prop], receiver, args);
                console.log(`Method ${String(prop)} finished. New array: ${JSON.stringify(target)}`);
                return result;
            };
        }
        return Reflect.get(target, prop, receiver);
    },
    set: function (target, property, value, receiver) {
        console.log(`Setting property: ${String(property)} to value: ${String(value)}`);
        return Reflect.set(target, property, value, receiver);
    },
    deleteProperty: function (target, property) {
        console.log(`Deleting property: ${String(property)}`);
        return Reflect.deleteProperty(target, property);
    }
};

const targetArray = ['a', 'b', 'c', 'd'];
const proxyArray = new Proxy(targetArray, handler);

console.log('--- Calling splice() ---');
// Insert 'x' and 'y' at index 1, remove 1 element ('b')
proxyArray.splice(1, 1, 'x', 'y');
console.log('--- splice() finished ---');

let items = new Proxy(array3, handler/* {
    get(target, prop) {
        console.log('proxy', target, prop)
        if (prop in target) {
            return target[prop];
        } else {
            return 0; // значение по умолчанию
        }
    }
   
}*/);
export default items