/** Functions for the formation of finite elements
 *
 * Abbreviation and terms:
 *  node     - beam point       / узел
 *  element  - finite element   / конечный элемент
 *
 *  joint    - swing joint      / шарнирное соединение
 *  def      - definition       / закрепление
 *   [0, 0, 0]  - no definitions/ свободное перемещение
 *   [0, 1, 0]  - roller        / перемещение по вертикали запрещено
 *   [1, 1, 1]  - fixed         / жесткая заделка
 *
 *  load     - (+ up) force     / нагрузка, положительное направление: вверх
 *  distload - (+ up) distributed load [node1.q, node2.q]
 *                              / распределенная нагрузка, положительна: вверх
 *  moment   - (+ counterclockwise) force moment
 *                              / момент, положительный: против часовой стрелки
 *  mat      - material { E: value, J: value, A: value } / материал
 *   E       - elastic modulus  / модуль упругости
 *   J       - inertia          / момент инерции
 *   A       - area             / площадь поперечного сечения
 *
 *  len      - length of elem   / длинна коненчого элемента
 *  loc      - local stiffness matrix for beam
 *                              / локальная матрица жесткости
 *  fdist    - distributed load local vector
 *                              / локальный вектор из распределенной нагрузки
 */

function element(nodes, distload = null, mat = { E: 1, J: 1, A: 1 }) {
  const len = nodes[1].x - nodes[0].x;
  const loc = local(len, mat);
  const fdist = fdistload(len, distload);
  return { nodes, distload, mat, len, loc, fdist };
}

function node(x, def = [0, 0, 0], load = 0, moment = 0, joint = false) {
  return { x, def, load, moment, joint };
}

function local(l, mat) {
  const EJ = mat.E * mat.J;
  return [
    [
      (1 / l ** 3) * (EJ * 12),
      (1 / l ** 2) * (EJ * 6),
      (1 / l ** 3) * (EJ * -12),
      (1 / l ** 2) * (EJ * 6)
    ],
    [
      (1 / l ** 2) * (EJ * 6),
      (1 / l ** 1) * (EJ * 4),
      (1 / l ** 2) * (EJ * -6),
      (1 / l ** 1) * (EJ * 2)
    ],
    [
      (1 / l ** 3) * (EJ * -12),
      (1 / l ** 2) * (EJ * -6),
      (1 / l ** 3) * (EJ * 12),
      (1 / l ** 2) * (EJ * -6)
    ],
    [
      (1 / l ** 2) * (EJ * 6),
      (1 / l ** 1) * (EJ * 2),
      (1 / l ** 2) * (EJ * -6),
      (1 / l ** 1) * (EJ * 4)
    ]
  ];
}

function fdistload(l, q) {
  const dist = [0, 0, 0, 0];
  if (q) {
    if (q[0] == q[1]) {
      dist[0] = (q[0] * l ** 1) / 2;
      dist[1] = (q[0] * l ** 2) / 12;
      dist[2] = (q[0] * l ** 1) / 2;
      dist[3] = (q[0] * l ** 2) / -12;
    } else {
      dist[0] = (l / 2) * ((2 / 3) * q[0] + (1 / 3) * q[1]);
      dist[2] = (l / 2) * ((1 / 3) * q[0] + (2 / 3) * q[1]);
    }
  }
  return dist;
}

//export { element, node };
module.exports = { element, node };
