export default class Layout {
  constructor(count_of_slots) {
    this._count_slots = count_of_slots; // Общее кол-во слотов
    this._visible_slots = undefined; // Кол-во видимых слотов
    this._control = true; // Включено ли управление
    this._show_array = undefined; // Логический массив показа слотов
    this._style_array = { left: undefined, right: undefined }; // Массив стилей для слотов
    this._direction = "left"; // Направление анимации

    this.rebuild();
  }

  rebuild() {
    const CALC_VISIBLE_SLOTS = Math.ceil(window.innerWidth / 800);

    if (CALC_VISIBLE_SLOTS != this._visible_slots) {
      this._visible_slots = CALC_VISIBLE_SLOTS;
      this._control = this._count_slots != this._visible_slots;
      this.newBuild();
    }
  }

  newBuild() {
    const INIT_SLOT = this.initSlot();

    // build show_slots
    this._show_array = [];
    for (let i = 0; i < this._count_slots; i++) {
      if (i < this._visible_slots) this._show_array.push(1);
      else this._show_array.push(0);
    }

    // build _style_array
    this._style_array = { left: [], right: [] };
    let j = 0;
    let left = "0%";
    for (let i = 0; i < this._count_slots; i++) {
      // direction left
      if (this._show_array[i] == 1 || j == this._visible_slots) {
        if (j == this._visible_slots)
          left = `${(100 / this._visible_slots) * (j - 1)}%`;
        else left = `${(100 / this._visible_slots) * j}%`;
      } else {
        left = "0%";
      }
      this._style_array.left.push({
        width: `${100 / this._visible_slots}%`,
        left: left,
      });
      // direction right

      if (this._show_array[i] == 1 || j == this._visible_slots) {
        if (j == this._visible_slots)
          left = `${(100 / this._visible_slots) * 0}%`;
        else left = `${(100 / this._visible_slots) * j}%`;
      } else {
        left = "0%";
      }

      j++;

      this._style_array.right.push({
        width: `${100 / this._visible_slots}%`,
        left: left,
      });
    }
  }

  initSlot() {
    if (!this._show_array) return 0;
    const LAST = this._show_array.length - 1;

    if (this._show_array[LAST] == 1) {
      return this._show_array.lastIndexOf(0, LAST) + 1;
    } else {
      return this._show_array.indexOf(1, 0);
    }
  }

  // INSTRUCTIONS

  left() {
    this._direction = "left";
    this._show_array.push(this._show_array.shift());
    let s = this._show_array;
    this._show_array = [0, 0, 0, 0];

    setTimeout(() => {
      this._style_array.right.push(this._style_array.right.shift());
      this._style_array.left.push(this._style_array.left.shift());
      this._show_array = s;
    });
  }

  right() {
    this._direction = "right";
    this._show_array.unshift(this._show_array.pop());
    let s = this._show_array;
    this._show_array = [0, 0, 0, 0];

    setTimeout(() => {
      this._style_array.right.unshift(this._style_array.right.pop());
      this._style_array.left.unshift(this._style_array.left.pop());
      this._show_array = s;
    });
  }

  dots(dot, queue) {
    const init = this.initSlot();

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
    return this._style_array[this._direction][index];
  }
}
