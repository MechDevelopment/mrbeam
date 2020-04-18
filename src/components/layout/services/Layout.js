export default class Layout {
  constructor(count_of_slots) {
    this._count_slots = count_of_slots; // Общее кол-во слотов
    this._visible_slots = undefined; // Кол-во видимых слотов
    this._control = true; // Включено ли управление
    this._show_array = undefined; // Логический массив показа слотов
    this._style_array = undefined; // Массив стилей для слотов
    this._direction = "left"; // Направление анимации

    this.rebuild();
  }

  rebuild() {
    const CALC_VISIBLE_SLOTS = Math.ceil(window.innerWidth / 800);

    if (CALC_VISIBLE_SLOTS != this._visible_slots) {
      this._visible_slots = CALC_VISIBLE_SLOTS;
      this._control = this._count_slots != this._visible_slots;
      this._newBuild();
    }
  }

  _newBuild() {
    const INIT = this._initSlot();
    const N = this._count_slots;
    const M = this._visible_slots;

    // Построение массива показа слотов
    this._show_array = this._createShow(INIT, N, M);

    // Построение массива стилей для оберки слотов
    this._style_array = this._createStyle(INIT, N, M);
  }

  _initSlot() {
    if (!this._show_array) return 0;
    const LAST = this._show_array.length - 1;

    if (this._show_array[LAST] == 1) {
      return this._show_array.lastIndexOf(0, LAST) + 1;
    } else {
      return this._show_array.indexOf(1, 0);
    }
  }

  _createShow(INIT, N, M) {
    let array = [];
    for (let i = 0; i < N; i++) array[i] = i < M ? 1 : 0;
    for (let i = 0; i < INIT; i++) array.unshift(array.pop());
    return array;
  }

  _createStyle(INIT, N, M) {
    let array = [];

    let aside_left = [];
    let aside_right = [];
    for (let i = 0; i < N; i++) {
      aside_left[i] = i < M ? `${(100 / M) * i}%` : "0%";
      aside_right[i] = i < M ? `${(100 / M) * i}%` : "0%";
      if (i == M) aside_left[i] = `${(100 / M) * (i - 1)}%`;
    }

    for (let i = 0; i < INIT; i++) {
      aside_left.unshift(aside_left.pop());
      aside_right.unshift(aside_right.pop());
    }

    for (let i = 0; i < N; i++) {
      let left = { width: `${100 / M}%`, left: aside_left[i] };
      let right = { width: `${100 / M}%`, left: aside_right[i] };
      array[i] = { left, right };
    }
    return array;
  }

  // INSTRUCTIONS

  left() {
    this._direction = "left";
    this._show_array.push(this._show_array.shift());
    let s = this._show_array;
    this._show_array = [0, 0, 0, 0];

    setTimeout(() => {
      this._style_array.push(this._style_array.shift());
      this._show_array = s;
    });
  }

  right() {
    this._direction = "right";
    this._show_array.unshift(this._show_array.pop());
    let s = this._show_array;
    this._show_array = [0, 0, 0, 0];

    setTimeout(() => {
      this._style_array.unshift(this._style_array.pop());
      this._show_array = s;
    });
  }

  dots(dot, queue) {
    const init = this._initSlot();

    if (init != dot) {
      const len = this._show_array.length;

      let left;
      let right;

      if (init < dot) {
        left = init + len - dot;
        right = dot - init;
      }

      if (init > dot) {
        left = init - dot;
        right = dot + len - init;
      }

      if (left == right) {
        if (init < dot) {
          queue.add([...Array(right).keys()].map((el) => "right"));
        } else {
          queue.add([...Array(left).keys()].map((el) => "left"));
        }
      } else if (left < right) {
        queue.add([...Array(left).keys()].map((el) => "left"));
      } else {
        queue.add([...Array(right).keys()].map((el) => "right"));
      }
    }
  }

  // GETTERS

  getControl() {
    return this._control;
  }

  getDirection() {
    return this._direction;
  }

  getShow(index) {
    return this._show_array[index];
  }

  getStyle(index) {
    return this._style_array[index][this._direction];
  }
}
