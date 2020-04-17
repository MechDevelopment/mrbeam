export default class Queue {
  constructor(instructions, time = 1000) {
    this.instructions = instructions;
    this.time = time;

    this._duration = time;
    this._queue = [];
    this._timer = undefined;
  }

  add(instruction) {
    this._queue.push(...instruction);
    this._run();
  }

  getDuration() {
    return this._duration;
  }

  _run() {
    if (!this._timer && this._queue.length) {
      // Длительность выполнения инструкции
      this._duration = this.time / this._queue.length;

      // Запуск выполнения инструкции
      this.instructions[this._queue.shift()]();

      this._timeout();
    }
  }

  _timeout() {
    this._timer = setTimeout(() => {
      this._timer = undefined;
      this._run();
    }, this._duration + 100);
  }
}
