class Generator {
  /** Class can generate units, see settings inside */
  constructor() {
    this.settings = {
      defenition: true,
      load: true,
      angle: false,
      joint: false,
      moment: false,
      distload: false,
      material: false,
      dif_material: false,
      fixed_size: true
    };
  }

  generate(count_of_units, section) {
    let units = []; // result

    // Create a vector with coordinates
    const COORDINATES = createCoord(...arguments);

    // Create defenition units
    if (this.settings.defenition) {
      createDefenition(units, COORDINATES);
    }

    // Create loads
    if (this.settings.load) {
      createLoad(units, COORDINATES);
    }

    // Create empty units
    if (this.settings.fixed_size) {
      createEmpty(units, COORDINATES);
    }

    console.log(COORDINATES);
    console.log(JSON.stringify(units));
  }
}

function createCoord(count_of_units, section) {
  const [A, B] = section;
  const H = Math.abs(B - A) / (count_of_units - 1);
  const result = [];
  for (let i = 0; i < count_of_units; i++) {
    result.push(A + H * i);
  }
  return result;
}

function createDefenition(units, coords) {
  const N = coords.length - 1;
  if (randint(0, 1)) {
    // Fixed
    if (randint(0, 1)) {
      // At start
      units.push(create([coords[0]], 3, [3]));
    } else {
      // In the end
      units.push(create([coords[N]], 3, [3]));
    }
  } else {
    // Swivel
    let shift = randint(0, ((N - 1) / 2) >> 0);
    units.push(create([coords[0 + shift]], 3, [2]));
    units.push(create([coords[N - shift]], 3, [1]));
  }
}

function createLoad(units, coords){
  const N = coords.length - 1;
}

function createEmpty(units, coords) {
  const N = coords.length - 1;
  sortUnits(units);
  // In the end
  if (units[units.length - 1].x[0] != coords[N]) {
    units.push(create([coords[N]], 1, [0, 0]));
  }
  // At start
  if (units[0].x[0] != coords[0]) {
    units.push(create([coords[0]], 1, [0, 0]));
  }
}

function create(x, type, value) {
  return { x, type, value };
}

function randint(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

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

/** 
    complexity 0 - Симметричные балки с распределнной нагрузкой,
    моментами или силами, на выходе будем иметь только эпюры и реакции.
    complexity 1 - Убираем симметрию, добавляем шарниры и единый материал. 
    complexity 2 - Добавляем различный материал.
        
*/
function generateUnits(count, complexity) {
  let units = [];
  const N = count - 1;
  let shift = null;
  let type;

  if (complexity == 1) {
    // Первым делом сгенерируем закрепление(ия)
    if (randint(0, 1)) {
      // Жесткое
      if (randint(0, 1)) {
        // В начале отрезка
        units.push(create(0, [0], 3, [3]));
      } else {
        // В конце отрезка
        units.push(create(N, [N], 3, [3]));
      }
    } else {
      // Шарнирное
      shift = randint(0, ((N - 1) / 2) >> 0);
      units.push(create(0 + shift, [0 + shift], 3, [2]));
      units.push(create(N - shift, [N - shift], 3, [1]));
    }

    // Сгенерируем тип нагрузки
    if (randint(0, 1)) {
      type = 1;
      for (let id = 0; id < count; id++) {
        // Не стоит создавать лишние точки
        if (shift != null) {
          if (units[0].id != id && units[1].id != id) {
            units.push(create(id, [id], type, [randint(-3, 3) * 50, 90]));
          }
        } else {
          if (units[0].id != id) {
            units.push(create(id, [id], type, [randint(-3, 3) * 50, 90]));
          }
        }
      }
    } else {
      type = 2;
      for (let id = 0; id < count; id++) {
        // Не стоит создавать лишние точки
        if (shift != null) {
          if (units[0].id != id && units[1].id != id) {
            units.push(create(id, [id], type, [randint(-3, 3) * 50]));
          }
        } else {
          if (units[0].id != id) {
            units.push(create(id, [id], type, [randint(-3, 3) * 50]));
          }
        }
      }
    }
  } else if (complexity == 2) {
    // Шарнирное закрепление
    shift = randint(0, ((N - 1) / 2) >> 0);
    units.push(create(0, [0 + shift], 3, [2]));
    units.push(create(1, [N - shift], 3, [1]));

    // Распределенная нагрузка
    units.push(
      create(2, [0, N], 4, [randint(-3, 3) * 50, randint(-3, 3) * 50])
    );
  }
  sortUnits(units);
  return units;
}

export { generateUnits, Generator };
