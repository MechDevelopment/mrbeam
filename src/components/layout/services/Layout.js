export default class Layout {
  constructor(count_of_slots, max_width) {
    this._count_slots = count_of_slots; // Общее кол-во слотов
    this._visible_slots = undefined; // Кол-во видимых слотов
    this._control = true; // Включено ли управление
    this._show_array = undefined; // Логический массив показа слотов
    this._style_array = undefined; // Массив стилей для слотов
    this._direction = "left"; // Направление анимации
    this.max_width = max_width; // Максимальная ширина слота

    this.rebuild();
  }

  rebuild() {
    const CALC_VISIBLE_SLOTS = Math.ceil(window.innerWidth / this.max_width);
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
    let remember = this._show_array;
    remember.push(remember.shift());

    this._direction = "left";
    this._show_array = this._show_array.map((el) => 0);

    setTimeout(() => {
      this._style_array.push(this._style_array.shift());
      this._show_array = remember;
    });
  }

  right() {
    let remember = this._show_array;
    remember.unshift(remember.pop());

    this._direction = "right";
    this._show_array = this._show_array.map((el) => 0);

    setTimeout(() => {
      this._style_array.unshift(this._style_array.pop());
      this._show_array = remember;
    });
  }

  dots(index) {
    const INIT = this._initSlot();
    const LEN = this._show_array.length;

    if (INIT == index) return [];

    let aside_left;
    let aside_right;

    if (INIT < index) {
      aside_left = INIT + LEN - index;
      aside_right = index - INIT;
    } else {
      aside_left = INIT - index;
      aside_right = index + LEN - INIT;
    }

    if (aside_left == aside_right) {
      if (INIT < index) {
        return [...Array(aside_right).keys()].map((el) => "right");
      } else {
        return [...Array(aside_left).keys()].map((el) => "left");
      }
    } else if (aside_left < aside_right) {
      return [...Array(aside_left).keys()].map((el) => "left");
    } else {
      return [...Array(aside_right).keys()].map((el) => "right");
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
