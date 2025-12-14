let array3 = []
items = new Proxy(array3, {
    get(target, prop) {
        console.log('proxy', target, prop)
        if (prop in target) {
            return target[prop];
        } else {
            return 0; // значение по умолчанию
        }
    }
});
export default items