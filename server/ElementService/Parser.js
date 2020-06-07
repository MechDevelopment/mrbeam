import { element, node } from "../FemService/FElements";

/** Parse Units to instances of class Element */
function parseUnits(units) {
  // Separation of units
  let [group_1, group_2] = separation(units);

  // Preparation values in a groups
  preparation(group_1, group_2);

  // Sort by x[0]
  sortUnits(group_1);

  let result = [];
  let elem; // instance of class Element
  let node_1; // instances of class node
  let node_2 = node(group_1[0].x[0]);

  for (let i = 0; i < group_1.length; i++) {
    // Filling instance of class node
    decryption(node_2, group_1[i].type, group_1[i].value);

    // if next Unit have same coordinates - continue
    if (i + 1 < group_1.length) {
      if (group_1[i].x[0] == group_1[i + 1].x[0]) {
        continue;
      }
    }

    if (node_1 != undefined) {
      elem = element([node_1, node_2]);

      // Filling instance of class Element
      for (let j = 0; j < group_2.length; j++) {
        if (group_2[j].x == undefined || isCollision(elem, group_2, i, j)) {
          decryption(elem, group_2[j].type, group_2[j].value);
        }
      }

      result.push(elem);
    }

    // Swap points
    if (i + 1 < group_1.length) {
      node_1 = node_2;
      node_2 = node(group_1[i + 1].x[0]);
    }
  }
  return result;
}

/** Separate units by type [1,2,3] and [4,5] */
function separation(units) {
  let group_1 = [];
  let group_2 = [];
  for (let i = 0; i < units.length; i++) {
    if ([1, 2, 3].includes(units[i].type)) {
      group_1.push(units[i]);
    } else {
      group_2.push(units[i]);
    }
  }
  return [group_1, group_2];
}

/** Create additional units and values */
function preparation(group_1, group_2) {
  // Distributed load function
  function dist_func(x, p) {
    let [x1, x2] = x;
    let [y1, y2] = p;
    return function(t) {
      // Catch division by zero
      let k = x1 - x2 ? (y1 - y2) / (x1 - x2) : 0;
      let b = y1 - x1 * k;

      return k * t + b;
    };
  }

  // Create empty Unit
  function empty(x) {
    return {
      x: [x],
      type: 1,
      value: [0, 0],
    };
  }

  for (let i = 0; i < group_2.length; i++) {
    // Add empty points in group_1
    if (group_2[i].x != undefined) {
      group_1.push(empty(group_2[i].x[0]), empty(group_2[i].x[1]));
    }

    // Create distributed load as a function
    if (group_2[i].type === 4 && typeof group_2[i].value != typeof Function) {
      let distload = dist_func(group_2[i].x, group_2[i].value);
      group_2[i].value = distload;
    }

    // Create material as instance class Material
    if (group_2[i].type === 5 && !(group_2[i].value instanceof Object)) {
      group_2[i].value = {
        E: group_2[i].value[0],
        J: group_2[i].value[1],
        A: group_2[i].value[2],
      };
    }
  }
}

/** Sort units by x[0] */
function sortUnits(units) {
  units.sort(function(a, b) {
    if (a.x[0] < b.x[0]) {
      return -1;
    }
    if (a.x[0] > b.x[0]) {
      return 1;
    }
    return 0;
  });
}

/** Filling instance by type and value */
function decryption(instance, type, value) {
  switch (type) {
    case 1:
      instance.load += value[0];
      break;
    case 2:
      instance.moment += value[0];
      break;
    case 3:
      switch (value[0]) {
        case 1:
          instance.def = [1, 1, 1];
          break;
        case 2:
          instance.def = [1, 1, 0];
          break;
        case 3:
          instance.def = [0, 1, 0];
          break;
        case 4:
          instance.joint = true;
          break;
      }
      break;
    case 4:
      instance.distload.push(value);
      break;
    case 5:
      instance.material = {
        E: value[0],
        J: value[1],
        A: value[2],
      };
      break;
  }
}

/** Group_2 include points from group_1 ?   */
function isCollision(elem, group_2, i, j) {
  let p1 = [elem.nodes[0].x, elem.nodes[1].x];
  let p2 = group_2[j].x;
  let [x1, x2] = p1;
  let [y1, y2] = p2;
  return y1 <= x1 && y2 >= x2;
}
export default parseUnits;
