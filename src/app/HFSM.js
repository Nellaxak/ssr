//const machine = {
class HFSM {
    constructor(index) {
        this.state = 'OFF'
        this.index = index
        this.transitions = {
            OFF: {
                press() {
                    //console.log('LOAD', this.index)
                    this.state = 'LOAD';
                }
            },
            LOAD: {
                press() {
                    //console.log('SCROLL', this.index)
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
