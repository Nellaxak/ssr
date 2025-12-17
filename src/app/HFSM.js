export default class HFSM {
    constructor(config) {
        this.index = config.index;
        this.state = config.initial; // Начальное состояние автомата
        this.transitions = config.transitions; // Описание всех возможных переходов
        this.callbacks = config.callbacks || {}; // Функции обратного вызова (действия)
        this.states = config.states || {}; // Для определения вложенных (иерархических) FSM
        this.history = []; // История переходов состояний
    }

    // Проверяет, возможно ли данное событие в текущем состоянии
    can(event) {
        const allowed = this.getTransitionsForState(this.state);
        return allowed.some(t => t.event === event);
    }

    // Инициирует переход по событию
    trigger(event, ...args) {
        const allowed = this.getTransitionsForState(this.state);
        const transition = allowed.find(t => t.event === event);

        if (!transition) {
            console.warn(`Event "${event}" not allowed in state "${this.state}"`);
            return false;
        }

        const from = this.state;
        const to = transition.to;
        const capitalizedEvent = HFSM.capitalize(event);

        // Коллбэк перед переходом
        const beforeCallback = `onBefore${capitalizedEvent}`;
        if (this.callbacks[beforeCallback]) {
            this.callbacks[beforeCallback](from, to, ...args);
        }

        // Смена состояния
        this.state = to;
        this.history.push({ from, to, event, timestamp: Date.now() });

        // Коллбэк после перехода
        const afterCallback = `onAfter${capitalizedEvent}`;
        if (this.callbacks[afterCallback]) {
            this.callbacks[afterCallback](from, to, ...args);
        }

        // Общий коллбэк на изменение состояния
        if (this.callbacks.onStateChange) {
            this.callbacks.onStateChange(from, to);
        }

        // Обработка вложенного FSM, если новое состояние является таковым
        if (this.states[to] instanceof HFSM) {
            this.states[to].start(...args);
        }

        return true;
    }

    // Запускает начальный коллбэк, если он определен
    start(...args) {
        if (this.callbacks.onStart) {
            this.callbacks.onStart(this.state, ...args);
        }
    }

    // Вспомогательный метод для получения доступных переходов из заданного состояния
    getTransitionsForState(state) {
        return this.transitions[state] || [];
    }

    // Возвращает историю переходов
    getHistory() {
        return this.history;
    }

    // Вспомогательный метод для капитализации первой буквы строки (для имен коллбэков)
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}