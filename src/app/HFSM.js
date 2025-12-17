//const machine = {
class HFSM {
    constructor(index) {
        this.state = 'OFF'
        this.index = index
        this.transitions = {
            OFF: {
                press() {
                    this.state = 'LOAD'
                }
            },
            LOAD: {
                press() {
                    this.state = 'SCROLL';
                },
            },
            SCROLL: {
                press() {
                    this.state = 'OFF';
                },
            },
        }
    }
    dispatch(actionName) {
        const action = this.transitions[this.state][actionName];

        if (action) {
            action.call(this);
        } else {
            console.log('Invalid action');
        }
    }
}
export default HFSM
/*const flashlight = Object.create(machine);
console.log(flashlight.state); // OFF
flashlight.dispatch('press'); 
console.log(flashlight.state); // ON
flashlight.dispatch('press');
console.log(flashlight.state); // BLINK
*/
