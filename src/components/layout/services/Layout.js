export default class Layout {
  constructor(context) {
    this.len = context;


    this.n = undefined;
    this.m = undefined;
    this.count_of_slots = 0;
    this.first_active_slot = 0;
    this.tools = true;

    this.show_slots = [0, 0, 0, 0];
    this.wrap_style = { left: [0, 0, 0, 0], right: [0, 0, 0, 0] };

    this.direction = "left"
  }

  left() {

    
    console.log(this.count_of_slots)
    console.log(this.show_slots)
    console.log(this.wrap_style)
    
    this.direction = "left";
    this.show_slots.push(this.show_slots.shift());
    let s = this.show_slots;
    this.show_slots = [0, 0, 0, 0];

    setTimeout(() => {
      this.wrap_style.right.push(this.wrap_style.right.shift());
      this.wrap_style.left.push(this.wrap_style.left.shift());
      this.show_slots = s;
    });
  }

  right() {
    this.direction = "right";
    this.show_slots.unshift(this.show_slots.pop());
    let s = this.show_slots;
    this.show_slots = [0, 0, 0, 0];

    setTimeout(() => {
      this.wrap_style.right.unshift(this.wrap_style.right.pop());
      this.wrap_style.left.unshift(this.wrap_style.left.pop());
      this.show_slots = s;
    });
  }

  dots(dot, queue) {
    let init = this.show_slots.indexOf(1, 0);

    if (this.show_slots[this.show_slots.length - 1] == 1) {
      init = this.show_slots.lastIndexOf(0, this.show_slots.length - 1) + 1;
    }

    if (init != dot) {
      const len = this.show_slots.length;

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

  buildData(n, m) {
    // build show_slots
    this.show_slots = [];
    for (let i = 0; i < n; i++) {
      if (i < m) this.show_slots.push(1);
      else this.show_slots.push(0);
    }

    // build wrap_style
    this.wrap_style = { left: [], right: [] };
    let j = 0;
    let left = "0%";
    for (let i = 0; i < n; i++) {
      // direction left
      if (this.show_slots[i] == 1 || j == m) {
        if (j == m) left = `${(100 / m) * (j - 1)}%`;
        else left = `${(100 / m) * j}%`;
      } else {
        left = "0%";
      }
      this.wrap_style.left.push({
        width: `${100 / m}%`,
        left: left,
      });
      // direction right

      if (this.show_slots[i] == 1 || j == m) {
        if (j == m) left = `${(100 / m) * 0}%`;
        else left = `${(100 / m) * j}%`;
      } else {
        left = "0%";
      }

      j++;

      this.wrap_style.right.push({
        width: `${100 / m}%`,
        left: left,
      });
    }

  }

  onResize() {
    const N = this.len;
    let m = this.count_of_slots;
    this.count_of_slots = Math.ceil(window.innerWidth / 800);
    this.tools = N == this.count_of_slots ? false : true;

    if (m != this.count_of_slots) {
      this.buildData(N, this.count_of_slots);
    }
  }

  isTools() {
    return this.tools;
  }

  getDirection() {
    return this.direction;
  }

  getShow(index) {
    return this.show_slots[index];
  }

  getStyle(index) {
    return this.wrap_style[this.direction][index]
  }


}
